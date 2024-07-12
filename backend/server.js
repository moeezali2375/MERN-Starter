const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const homeRoutes = require("./routes/routes");
const authRoutes = require("./routes/authRoutes");
const protectRoutes = require("./routes/protectRoutes");

const app = express();

//!Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", homeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/protect", protectRoutes);

app.get("*", (req, res) => res.redirect("/api"));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server Started on Port: " + PORT);
  connectDB();
});
