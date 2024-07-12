const router = require("express").Router();
const protect = require("../middlewares/authMiddleware");
const userVerify = require("../middlewares/verifyMiddleware");
const { checkLogin } = require("../controllers/protectControllers");

router.get("/", protect, userVerify, checkLogin);

module.exports = router;
