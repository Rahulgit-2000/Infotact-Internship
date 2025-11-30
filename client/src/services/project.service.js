import apiService from "./api.service";

export const projectService = {
  createProject: async (data) => {
    const res = await apiService.post("/api/projects", data);
    return res.data;
  },

  getAllProjects: async () => {
    const res = await apiService.get("/api/projects");
    return res.data;
  },

  getProjectById: async (projectId) => {
    const res = await apiService.get(`/api/projects/${projectId}`);
    return res.data;
  },
};
