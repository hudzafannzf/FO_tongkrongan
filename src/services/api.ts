import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("Token yang diambil dari local storage:", token); // <-- TAMBAHKAN INI
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Header Authorization dipasang:", config.headers.Authorization); // <-- TAMBAHKAN INI
  } else {
    console.log("Token tidak ditemukan di local storage!"); // <-- TAMBAHKAN INI
  }
  return config;
});

export default api;