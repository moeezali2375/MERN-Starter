import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";       // 👈 import cors
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());               // 👈 allow frontend (port 3000) to access backend (port 5000)

// Routes
app.use("/api/todos", todoRoutes);

// Connect DB & Start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error(err));
