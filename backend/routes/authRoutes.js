const router = require("express").Router();
const protect = require("../middlewares/authMiddleware");
const {
  registerUser,
  verifyToken,
  regenerateToken,
  login,
  changePassword,
  changeEmail,
} = require("../controllers/authControllers");

router.get("/", (req, res) => {
  res.send("Auth Routes");
});

router.post("/register", registerUser);

router.get("/token/verify/:token", protect, verifyToken);

router.get("/token/regenerate", protect, regenerateToken);

router.post("/login", login);

router.put("/password", protect, changePassword);

router.put("/email", protect, changeEmail);

module.exports = router;
