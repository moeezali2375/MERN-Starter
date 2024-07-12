const jwt = require("jsonwebtoken");

const generateToken = (id, rememberMe = 0) => {
  let time = "1d";
  if (rememberMe) time = "30d";
  return jwt.sign({ id }, process.env.ACCESS_TOKEN, {
    expiresIn: time,
  });
};

module.exports = generateToken;
