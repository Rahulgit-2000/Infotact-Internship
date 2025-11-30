const express = require("express");
const router = express.Router();

const {
  createProject,
  getAllProjects,
  getProjectById,
} = require("../controllers/project.controller");

const { authMiddleware } = require("../middleware/auth");

// Create a project
router.post("/", authMiddleware, createProject);

// Get all projects of logged-in user
router.get("/", authMiddleware, getAllProjects);

// Get single project by ID
router.get("/:id", authMiddleware, getProjectById);

module.exports = router;
