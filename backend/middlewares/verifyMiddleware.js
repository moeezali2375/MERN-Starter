const User = require("../models/userModel");

const verify = async (req, res, next) => {
  if (req.user.isVerified) return next();
  else {
    res.status(403).send({
      msg: {
        title: "Your account is not verified! 🤪",
      },
    });
  }
};

module.exports = verify;
