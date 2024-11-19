// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchUsers = () => api.get("/users");
export const addUser = (user) => api.post("/users", user);
export const editUser = (user) => api.put(`/users/${user.id}`, user);
export const deleteUser = (id) => api.delete(`/users/${id}`);

export default api;
