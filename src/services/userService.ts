import api from "../api/axios";

const userService = {
  getAll() {
    return api.get("/user");
  },

  getById(id: number) {
    return api.get(`/user/${id}`);
  },

  create(data: unknown) {
    return api.post("/user", data);
  },

  update(id: number, data: unknown) {
    return api.put(`/user/${id}`, data);
  },

  delete(id: number) {
    return api.delete(`/user/${id}`);
  },
};

export default userService;