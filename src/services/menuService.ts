import api from "../api/axios";

const menuService = {
  getAll() {
    return api.get("/menu");
  },

  getByTenant(id: number) {
    return api.get(`/menu/tenant/${id}`);
  },

  create(data: unknown) {
    return api.post("/menu", data);
  },

  update(id: number, data: unknown) {
    return api.put(`/menu/${id}`, data);
  },

  delete(id: number) {
    return api.delete(`/menu/${id}`);
  },
};

export default menuService;