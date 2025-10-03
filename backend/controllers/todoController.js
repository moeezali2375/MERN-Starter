import Todo from "../models/Todo.js";

// Get all todos
export const getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
};

// Create todo
export const createTodo = async (req, res) => {
  const todo = new Todo({ text: req.body.text });
  const saved = await todo.save();
  res.status(201).json(saved);
};

// Update todo
export const updateTodo = async (req, res) => {
  const updated = await Todo.findByIdAndUpdate(
    req.params.id,
    { completed: req.body.completed },
    { new: true }
  );
  res.json(updated);
};

// Delete todo
export const deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
};
