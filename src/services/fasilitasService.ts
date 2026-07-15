import api from "./api";

// CRUD Fasilitas (Super Admin)

export const getFasilitas = async () => {
  const res = await api.get("/fasilitas");
  return res.data;
};

export const getFasilitasById = async (id: number) => {
  const res = await api.get(`/fasilitas/${id}`);
  return res.data;
};

export const createFasilitas = async (data: any) => {
  const res = await api.post("/fasilitas", data);
  return res.data;
};

export const updateFasilitas = async (id: number, data: any) => {
  const res = await api.put(`/fasilitas/${id}`, data);
  return res.data;
};

export const deleteFasilitas = async (id: number) => {
  const res = await api.delete(`/fasilitas/${id}`);
  return res.data;
};

// ==========================
// Tenant memilih fasilitas
// ==========================

export const getTenantFasilitas = async () => {
  // Ubah endpoint-nya sesuai route baru backend
  const res = await api.get("/fasilitas/tenant/my-facilities"); 
  return res.data;
};

export const updateTenantFasilitas = async (fasilitasIds: number[]) => {
  // Ubah endpoint-nya sesuai route baru backend
  const res = await api.put("/fasilitas/tenant/my-facilities", {
    fasilitasIds,
  });
  return res.data;
};