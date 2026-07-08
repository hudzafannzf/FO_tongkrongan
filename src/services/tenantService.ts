import api from "./api";

export const getTenants = async () => {
  const response = await api.get("/tenant");
  return response.data;
};

export const getTenantById = async (id: number) => {
  const response = await api.get(`/tenant/${id}`);
  return response.data;
};

export const createTenant = async (data: any) => {
  const response = await api.post("/tenant", data);
  return response.data;
};

export const updateTenant = async (id: number, data: any) => {
  const response = await api.put(`/tenant/${id}`, data);
  return response.data;
};

export const deleteTenant = async (id: number) => {
  const response = await api.delete(`/tenant/${id}`);
  return response.data;
};