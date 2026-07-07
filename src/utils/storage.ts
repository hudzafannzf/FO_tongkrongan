export const storage = {
  getToken: () => localStorage.getItem("token"),

  setToken: (token: string) =>
    localStorage.setItem("token", token),

  removeToken: () =>
    localStorage.removeItem("token"),

  getUser: () => {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  },

  setUser: (user: unknown) =>
    localStorage.setItem("user", JSON.stringify(user)),

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};