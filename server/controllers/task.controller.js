const Task = require("../models/task.model");

class TaskController {
  // CREATE
  async createTask(req, res) {
    try {
      const { title, description } = req.body;
      const { projectId } = req.params;

      const task = await Task.create({
        title,
        description: description || "",
        status: "todo",
        projectId,
        createdBy: req.user._id,   // 🔥 REQUIRED FIELD ADDED
        order: 0,
      });

      res.status(201).json({ success: true, task });
    } catch (err) {
      console.error("CreateTask Error:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  }

  // GET ALL BY PROJECT
  async getTasksByProject(req, res) {
    try {
      const { projectId } = req.params;
      const tasks = await Task.find({ projectId }).sort({ order: 1 });

      res.json({ success: true, tasks });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  // UPDATE TASK
  async updateTask(req, res) {
    try {
      const task = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json({ success: true, task });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  // MOVE TASK (status + order)
  async moveTask(req, res) {
    try {
      const { status, order } = req.body;

      const task = await Task.findByIdAndUpdate(
        req.params.id,
        { status, order },
        { new: true }
      );

      res.json({ success: true, task });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  // DELETE
  async deleteTask(req, res) {
    try {
      await Task.findByIdAndDelete(req.params.id);
      res.json({ success: true, message: "Task deleted" });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new TaskController();
