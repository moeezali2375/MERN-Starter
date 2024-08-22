const express = require("express");
require("dotenv").config();
require("./jobs/cleanup");
const connectDB = require("./config/db");
const homeRoutes = require("./routes/routes");
const authRoutes = require("./routes/authRoutes");
const protectRoutes = require("./routes/protectRoutes");
const { crossOrigin } = require("./middlewares/corsMiddleware");
const path = require("path");

const app = express();

//!Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
crossOrigin(app);
app.use("/api", homeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/protect", protectRoutes);

const __dirname1 = path.resolve();

app.get("*", (req, res) => res.redirect("/api"));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server Started on Port: " + PORT);
  connectDB();
});
