const router = require("express").Router();
const protect = require("../middlewares/authMiddleware");
const {
  registerUser,
  verifyToken,
  regenerateToken,
  login,
} = require("../controllers/authControllers");

router.get("/", (req, res) => {
  res.send("Auth Routes");
});

router.post("/register", registerUser);

router.get("/token/verify/:token", protect, verifyToken);

router.get("/token/regenerate", protect, regenerateToken);

router.post("/login", login);

module.exports = router;
