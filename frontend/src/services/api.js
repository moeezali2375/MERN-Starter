import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const fetchTodos = () => API.get("/todos");
export const createTodo = (text) => API.post("/todos", { text });
export const updateTodo = (id, completed) => API.put(`/todos/${id}`, { completed });
export const deleteTodo = (id) => API.delete(`/todos/${id}`);
