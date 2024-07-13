const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const {
  generateVerificationToken,
  expiry,
} = require("../utils/verificationToken");
const generateToken = require("../utils/generateToken");

const sendCode = async (user) => {
  try {
    // const verificationUrl = `http://${req.headers.host}/api/auth/verify/${user.verificationToken}`;
    // const message = `<p>Please verify your email by clicking the link below:</p><a href="${verificationUrl}">${verificationUrl}</a>`;
    const emailContent = `
          <p>Dear User,</p>
          <p>Thank you for signing up. Your verification code is: <strong>${user.verificationToken}</strong></p><p>This code will expire after 5 minutes.</p>
          <p>Best regards,<br>Moeez Ali</p>`;
    await sendEmail(user.email, "Email Verification", emailContent);
  } catch (error) {
    res.status(500).send("Error Sending Email");
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please give name, email and password");
    }

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      throw new Error("User Already Exists");
    }

    const user = new User({
      name: name,
      email: email,
      password: password,
      verificationToken: generateVerificationToken(),
      verificationTokenExpires: expiry(300),
    });

    await user.save();

    await sendCode(user);

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
    await sendCode(user);
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
    res.status(500).send("An unexpected error occurred.", error.message);
  }
};

module.exports = {
  registerUser,
  verifyToken,
  regenerateToken,
  login,
};
