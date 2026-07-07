import api from "../api/axios";

export default {
  saw(data: unknown) {
    return api.post("/spk/saw", data);
  },

  wp(data: unknown) {
    return api.post("/spk/wp", data);
  },

  topsis(data: unknown) {
    return api.post("/spk/topsis", data);
  },
};