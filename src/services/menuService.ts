import api from "./api";

export const getMenus = async () => {
  return await api.get("/menus"); 
};

export const getMenuById = async (id: number) => {
  return await api.get(`/menus/${id}`);
};

export const createMenu = async (data: any) => {
  return await api.post("/menus", data);
};

export const updateMenu = async (id: number, data: any) => {
  return await api.put(`/menus/${id}`, data);
};

export const deleteMenu = async (id: number) => {
  return await api.delete(`/menus/${id}`);
};