import api from "./api";

export const login = async (email: string, password: string) => {
  const response = await api.post("/login", {
    email,
    password,
  });

  return response.data;
};

export const register = async (data: {
  username: string;
  email: string;
  password: string;
  role: string;
}) => {
  const response = await api.post("/register", data);

  return response.data;
};