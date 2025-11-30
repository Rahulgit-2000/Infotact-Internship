import apiService from "./api.service";

export const authService = {
  register: async (name, email, password) => {
    const res = await apiService.post("/api/auth/register", {
      name,
      email,
      password,
    });
    return res.data;
  },

  login: async (email, password) => {
    const res = await apiService.post("/api/auth/login", {
      email,
      password,
    });
    return res.data;
  },
};
