import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  text: { 
    type: String, 
    required: true },
  completed: { 
    type: Boolean, 
    default: false }
});

export default mongoose.model("Todo", todoSchema);
