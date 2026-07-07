import api from "../api/axios";

const authService = {
  login(data: {
    email: string;
    password: string;
  }) {
    return api.post("/auth/login", data);
  },

  register(data: unknown) {
    return api.post("/auth/register", data);
  },
};

export default authService;