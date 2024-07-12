const crypto = require("crypto");

const generateVerificationToken = () => {
  return crypto.randomBytes(3).toString("hex");
};

const expiry = (time) => {
  return new Date(Date.now() + time * 1000);
};

module.exports = {
  generateVerificationToken,
  expiry,
};
