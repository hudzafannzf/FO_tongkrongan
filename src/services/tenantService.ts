import api from "../api/axios";

const tenantService = {
  getAll() {
    return api.get("/tenant");
  },

  getById(id: number) {
    return api.get(`/tenant/${id}`);
  },

  create(data: unknown) {
    return api.post("/tenant", data);
  },

  update(id: number, data: unknown) {
    return api.put(`/tenant/${id}`, data);
  },

  delete(id: number) {
    return api.delete(`/tenant/${id}`);
  },
};

export default tenantService;