import apiService from "./api.service";

export const taskService = {
  // Create a task inside a project
  createTask: async (projectId, data) => {
    try {
      const res = await apiService.post(`/api/tasks/${projectId}`, data);
      return res.data;
    } catch (err) {
      throw err.response?.data || err.message;
    }
  },

  // Fetch tasks for a project
  getTasksByProject: async (projectId) => {
    try {
      const res = await apiService.get(`/api/tasks/${projectId}`);
      return res.data; // { success, tasks }
    } catch (err) {
      throw err.response?.data || err.message;
    }
  },

  // Update a task
  updateTask: async (taskId, data) => {
    try {
      const res = await apiService.put(`/api/tasks/update/${taskId}`, data);
      return res.data;
    } catch (err) {
      throw err.response?.data || err.message;
    }
  },

  // Move a task (status + order)
  moveTask: async (taskId, data) => {
    try {
      const res = await apiService.put(`/api/tasks/move/${taskId}`, data);
      return res.data;
    } catch (err) {
      throw err.response?.data || err.message;
    }
  },

  // Delete a task
  deleteTask: async (taskId) => {
    try {
      const res = await apiService.delete(`/api/tasks/${taskId}`);
      return res.data;
    } catch (err) {
      throw err.response?.data || err.message;
    }
  },
};
