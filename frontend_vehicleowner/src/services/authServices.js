// src/services/authServices.js
import axios from "axios";

const API_URL = "http://localhost:5001/api/auth"; 

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" };
  }
};

// Login an existing user
export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    return res.data; // includes token, user, redirectPath
  } catch (err) {
    throw err.response?.data || { message: 'Login failed' };
  }
};

