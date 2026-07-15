import api from "./api";

export const getGaleris = async () => {
  const response = await api.get("/galeris");
  return response.data;
};

export const getGaleriById = async (id: number) => {
  const response = await api.get(`/galeris/${id}`);
  return response.data;
};

export const createGaleri = async (data: FormData) => {
  const response = await api.post("/galeris", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updateGaleri = async (
  id: number,
  data: FormData
) => {
  const response = await api.put(`/galeris/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deleteGaleri = async (id: number) => {
  const response = await api.delete(`/galeris/${id}`);
  return response.data;
};