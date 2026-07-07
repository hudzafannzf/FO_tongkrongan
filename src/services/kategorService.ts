import api from "../api/axios";

export default {
  getAll() {
    return api.get("/kategori");
  },
};