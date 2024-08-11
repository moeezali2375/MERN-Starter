const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const {
  generateVerificationToken,
  expiry,
} = require("../utils/verificationToken");
const generateToken = require("../utils/generateToken");

const {
  emailVerificationMessage,
  changeEmailVerficationMessage,
} = require("../emails/verificationMessages");

const {
  emailVerificationNotification,
  changeEmailVerificationNotification,
  changePasswordNotification,
} = require("../emails/notificationMessages");

const sendEmailNotification = async (to, subject, message) => {
  try {
    await sendEmail(to, subject, message);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please give name, email and password");
    }
    const now = new Date();
    const userExists = await User.findOne({
      email: email,
    });
    if (userExists?.isVerified === true) {
      throw new Error("User Already Exists");
    } else if (userExists?.verificationTokenExpires > now) {
      throw new Error("User Already Exists");
    } else if (userExists?.verificationTokenExpires < now) {
      await User.findByIdAndDelete(userExists._id);
    }

    const user = new User({
      name: name,
      email: email,
      password: password,
      verificationToken: generateVerificationToken(),
      verificationTokenExpires: expiry(300), //5 min
    });

    await user.save();
    const message = emailVerificationMessage(user);
    await sendEmailNotification(user.email, message.subject, message.body);

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const verifyToken = async (req, res) => {
  if (req.user.isVerified)
    return res.status(400).send("User Already Verified.");
  try {
    const user = await User.findOne({
      verificationToken: req.params.token,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).send("Invalid or expired token.");
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;

    await user.save();

    const message = emailVerificationNotification(user);
    sendEmailNotification(user.email, message.subject, message.body);

    res.status(200).send("Email verified successfully.");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const regenerateToken = async (req, res) => {
  if (req.user.isVerified)
    return res.status(400).send("User Already Verified.");
  try {
    const user = await User.findById(req.user._id);
    user.verificationToken = generateVerificationToken();
    await user.save();

    const message = emailVerificationMessage(user);
    await sendEmailNotification(user.email, message.subject, message.body);

    res.status(200).send("Verification Code Sent.");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;
    if (!email || !password) {
      res.status(400).send("Please give Email and Password.");
      return;
    }
    const user = await User.findOne({ email: email });
    if (user) {
      const hehe = await user.matchPassword(password);
      if (hehe) {
        return res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isVerified: user.isVerified,
          token: generateToken(user._id, rememberMe),
        });
      } else return res.status(400).send("Incorrect Password.");
    } else {
      return res.status(400).send("The Email you have provided doesn't exist.");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    if (user) {
      const hehe = await user.matchPassword(oldPassword);
      if (hehe) {
        user.password = newPassword;
        await user.save();

        const message = changePasswordNotification(user);
        await sendEmailNotification(user.email, message.subject, message.body);

        res.status(200).send("🎉 Password Changed! 🥳");
      } else {
        throw new Error("Passwords don't match.");
      }
    } else {
      throw new Error("User doesn't exist.");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const changeEmail = async (req, res) => {
  try {
    const { newEmail, password } = req.body;
    const user = await User.findById(req.user._id);
    const newUser = await User.findOne({ email: newEmail });
    if (newUser) throw new Error("Requested email is already registered.");

    if (!user) throw new Error("Login again and then initiate this request.");
    else {
      const hehe = await user.matchPassword(password);
      if (hehe) {
        user.newEmail = newEmail;
        user.newEmailToken = generateVerificationToken();
        user.newEmailExpires = expiry(120); //5 mins

        await user.save();

        const message = changeEmailVerficationMessage(user);

        await sendEmailNotification(
          user.newEmail,
          message.subject,
          message.body
        );

        res.status(200).send("🎊 Email Change Request Generated!🙌");
      } else {
        throw new Error("Password Incorrect.");
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const verifyChangeEmail = async (req, res) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({
      _id: req.user._id,
      newEmailExpires: { $gt: Date.now() },
    });
    if (user) {
      if (await User.findOne({ email: user.newEmail }))
        throw new Error("Requested email is already registered.");

      if (user.newEmailToken === token) {
        const message = changeEmailVerificationNotification(user);
        
        user.email = user.newEmail;
        user.newEmail = undefined;
        user.newEmailExpires = undefined;
        user.newEmailToken = undefined;


        await user.save();

        await sendEmailNotification(user.email, message.subject, message.body);

        res.status(200).send("🎊 Your Email is Changed! 🥂");
      } else {
        throw new Error("Incorrect or Expired Token!");
      }
    } else {
      throw new Error("Invalid Link!");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
module.exports = {
  registerUser,
  verifyToken,
  regenerateToken,
  login,
  changePassword,
  changeEmail,
  verifyChangeEmail,
};
