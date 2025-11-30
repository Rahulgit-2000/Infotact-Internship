// server/routes/idea.routes.js
const express = require("express");
const router = express.Router();

const ideaController = require("../controllers/idea.controller");
const { authMiddleware } = require("../middleware/auth");

// Generate idea (guest allowed) – auth optional
router.post("/generate", ideaController.generateIdea);

// Save idea (requires auth)
router.post("/save", authMiddleware, ideaController.saveIdea);

// Get ideas created by logged-in user
router.get("/mine", authMiddleware, ideaController.getMyIdeas);

// Ideas linked to a specific project (requires auth)
router.get("/project/:projectId", authMiddleware, ideaController.getIdeasByProject);

// (Optional) all ideas – keep for admin/debug (requires auth)
router.get("/", authMiddleware, ideaController.getAllIdeas);

module.exports = router;
