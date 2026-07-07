import api from "../api/axios";

export default {
  getAll() {
    return api.get("/tenant-nilai");
  },

  create(data: unknown) {
    return api.post("/tenant-nilai", data);
  },

  update(id: number, data: unknown) {
    return api.put(`/tenant-nilai/${id}`, data);
  },
};