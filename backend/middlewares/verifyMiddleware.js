const User = require("../models/userModel");

const verify = async (req, res, next) => {
  if (req.user.isVerified) return next();
  else {
    res.status(403).send("Please verify your account.");
  }
};

module.exports = verify;
