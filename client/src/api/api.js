import axios from "axios";

const API_URL = "http://localhost:5000/api"; 

const api = axios.create({
  baseURL: API_URL || process.env.REACT_APP_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, 
  credentials: "include"
});

export const registerUser = (name, email, password) =>
  api.post("/auth/register", { name, email, password });

export const loginUser = (email, password) =>
  api.post("/auth/login", { email, password });

export const logoutUser = () => api.post("/auth/logout");

export const getMyProfile  = ()=> api.get('/auth/profile')

export default api;
