import api from "./api";

export const getTenants = async () => {
  const response = await api.get("/tenants");
  return response.data;
};

export const getTenantById = async (id: number) => {
  const response = await api.get(`/tenants/${id}`);
  return response.data;
};

export const createTenant = async (data: any) => {
  const response = await api.post("/tenants", data);
  return response.data;
};

export const updateTenant = async (id: number, data: any) => {
  const response = await api.put(`/tenants/${id}`, data);
  return response.data;
};

export const deleteTenant = async (id: number) => {
  const response = await api.delete(`/tenants/${id}`);
  return response.data;
};

export const getPendingTenants = async () => {
  const token = localStorage.getItem("token");
  
  // Gunakan 'api' instance, bukan 'axios'
  // Cukup "/tenants/pending" saja karena "/api" sudah otomatis ditambahkan oleh baseURL
  const res = await api.get("/tenants/pending", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data; // Pastikan menggunakan res.data
};

// ==========================================
// PERBAIKAN: Ditambahkan prefix /tenants
// ==========================================

export const approveTenant = async (id: number) => {
  // Ditambahkan  sebelum /tenants
  const res = await api.patch(`/tenants/${id}/approve`);
  return res.data;
};

export const rejectTenant = async (id: number) => {
  // Ditambahkan  sebelum /tenants
  const response = await api.patch(`/tenants/${id}/reject`);
  return response.data;
};