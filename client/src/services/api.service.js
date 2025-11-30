// client/src/services/api.service.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Base axios instance
const apiService = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically
apiService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ---------- IDEA SERVICE ----------
export const ideaService = {
  generateIdea: async (prompt, category, projectId = null) => {
    const res = await apiService.post("/api/ideas/generate", { prompt, category, projectId });
    return res.data;
  },

  saveIdea: async (payload) => {
    // payload should include: { title, description, category?, projectId?, parsedIdeas? }
    const res = await apiService.post("/api/ideas/save", payload);
    return res.data;
  },

  getAllIdeas: async () => {
    const res = await apiService.get("/api/ideas");
    return res.data;
  },

  getMyIdeas: async () => {
    const res = await apiService.get("/api/ideas/mine");
    return res.data;
  },

  getIdeasByProject: async (projectId) => {
    const res = await apiService.get(`/api/ideas/project/${projectId}`);
    return res.data;
  },
};

export default apiService;
