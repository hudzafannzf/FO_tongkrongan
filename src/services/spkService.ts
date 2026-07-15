import api from "./api"; // Menggunakan axios instance dengan interceptor

export const calculateSPK = async (bobot: any) => {
  return await api.post("/spk/calculate", { bobot });
};