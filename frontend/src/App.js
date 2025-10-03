import React, { useState, useEffect } from "react";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "./services/api";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [newText, setNewText] = useState("");

  useEffect(() => {
    fetchTodos().then(res => setTodos(res.data));
  }, []);

  const addTodo = () => {
    createTodo(newText).then(res => {
      setTodos([...todos, res.data]);
      setNewText("");
    });
  };

  const toggleTodo = (id, completed) => {
    updateTodo(id, !completed).then(res => {
      setTodos(todos.map(t => (t._id === id ? res.data : t)));
    });
  };

  const removeTodo = (id) => {
    deleteTodo(id).then(() => {
      setTodos(todos.filter(t => t._id !== id));
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>MERN Todo Demo</h1>
      <input value={newText} onChange={(e) => setNewText(e.target.value)} placeholder="New todo" />
      <button onClick={addTodo}>Add</button>
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={removeTodo} />
    </div>
  );
}

export default App;
