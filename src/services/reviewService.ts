import api from "../api/axios";

export default {
  getAll() {
    return api.get("/review");
  },

  create(data: unknown) {
    return api.post("/review", data);
  },

  balas(id: number, balasan: string) {
    return api.put(`/review/balasan/${id}`, {
      balasan,
    });
  },
};