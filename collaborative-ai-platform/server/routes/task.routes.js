const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const { authMiddleware } = require("../middleware/auth");

// Create task
router.post("/:projectId", authMiddleware, taskController.createTask);

// Get tasks by project
router.get("/:projectId", authMiddleware, taskController.getTasksByProject);

// Update task
router.put("/update/:id", authMiddleware, taskController.updateTask);

// Move task (update status + order)
router.put("/move/:id", authMiddleware, taskController.moveTask);

// Delete
router.delete("/:id", authMiddleware, taskController.deleteTask);

module.exports = router;
