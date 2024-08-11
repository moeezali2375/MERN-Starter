const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const now = new Date();
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
      const result = await User.findById(decoded.id);
      if (!result) {
        return res.status(401).send("Not Authorized.");
      } else if (result?.verificationTokenExpires < now) {
        return res.status(401).send("Not Authorized.");
      }
      req.user = {
        _id: result._id,
        name: result.name,
        email: result.email,
        isVerified: result.isVerified,
      };

      next();
    } catch (error) {
      console.log(error);
      return res.status(401).send("Not Authorized.");
    }
  }
  if (!token) return res.status(401).send("Not Authorized.");
};

module.exports = protect;
