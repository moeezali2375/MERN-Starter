const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Api is up and running");
});

module.exports = router;
