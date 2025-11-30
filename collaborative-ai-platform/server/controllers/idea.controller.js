// server/controllers/IdeaController.js
const AIService = require("../services/ai.service");
const Idea = require("../models/idea.model");

class IdeaController {
  // ============== GENERATE (AND OPTIONALLY SAVE) ==============
  async generateIdea(req, res) {
    try {
      const { prompt, category, projectId } = req.body;

      if (!prompt) {
        return res.status(400).json({
          success: false,
          message: "Prompt is required",
        });
      }

      console.log("Received request to generate idea:", {
        prompt,
        category,
        projectId,
        user: req.user?._id,
      });

      // Call AI service
      const { ideas } = await AIService.generateIdeas(prompt);
      console.log("AI generated ideas:", ideas);

      const descriptionText = ideas
        .map((i) => i.details || i.summary || i.concept || i.title)
        .join("\n\n");

      // If user is NOT logged in → DO NOT save, just return preview
      if (!req.user) {
        return res.status(200).json({
          success: true,
          data: {
            title: prompt,
            description: descriptionText,
            parsedIdeas: ideas,
            category: category || "general",
            projectId: projectId || null,
            aiGenerated: true,
            saved: false,
          },
        });
      }

      // Logged-in user → save idea (optionally linked to a project)
      const idea = await Idea.create({
        title: prompt,
        description: descriptionText,
        category: category || "general",
        projectId: projectId || null,
        createdBy: req.user._id,
        aiGenerated: true,
        parsedIdeas: ideas,
      });

      console.log("Idea saved successfully:", idea._id.toString());

      return res.status(201).json({
        success: true,
        data: {
          ...idea.toObject(),
          saved: true,
        },
      });
    } catch (error) {
      console.error("Detailed error in idea generation:", {
        message: error.message,
        stack: error.stack,
        name: error.name,
        cause: error.cause,
      });

      // common config errors
      if (error.message && error.message.includes("API key")) {
        return res.status(401).json({
          success: false,
          message: "API key configuration error",
          error: "Please check your Google API key configuration",
        });
      }

      if (error.message && error.message.includes("not found for API version")) {
        return res.status(400).json({
          success: false,
          message: "API model configuration error",
          error:
            "Invalid model configuration. Please check the API version and model name.",
        });
      }

      return res.status(500).json({
        success: false,
        message: "Error generating idea",
        error: error.message,
      });
    }
  }

  // ============== SAVE IDEA (explicit save endpoint) ==============
  // Expected payload (POST /api/ideas/save):
  // { title, description, category?, projectId?, parsedIdeas? }
  async saveIdea(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: "Authentication required" });
      }

      const { title, description, category, projectId, parsedIdeas } = req.body;

      if (!title || !description) {
        return res.status(400).json({ success: false, message: "title and description required" });
      }

      const idea = await Idea.create({
        title: title.trim(),
        description: description,
        category: category || "general",
        projectId: projectId || null,
        createdBy: req.user._id,
        aiGenerated: true,
        parsedIdeas: parsedIdeas || [],
      });

      return res.status(201).json({ success: true, idea });
    } catch (err) {
      console.error("SaveIdea error:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  // ============== ALL IDEAS (admin / debug) ==============
  async getAllIdeas(req, res) {
    try {
      const ideas = await Idea.find()
        .populate("createdBy", "name email")
        .populate("projectId", "name");

      res.status(200).json({
        success: true,
        data: ideas,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching ideas",
        error: error.message,
      });
    }
  }

  // ============== IDEAS FOR LOGGED-IN USER (any project) ==============
  async getMyIdeas(req, res) {
    try {
      if (!req.user) return res.status(401).json({ success: false, message: "Auth required" });
      const ideas = await Idea.find({ createdBy: req.user._id })
        .sort({ createdAt: -1 })
        .populate("projectId", "name");

      res.json({ success: true, data: ideas });
    } catch (err) {
      res
        .status(500)
        .json({ success: false, message: "Error fetching ideas", error: err.message });
    }
  }

  // ============== IDEAS PER PROJECT ==============
  async getIdeasByProject(req, res) {
    try {
      const { projectId } = req.params;

      if (!projectId) {
        return res
          .status(400)
          .json({ success: false, message: "projectId is required" });
      }

      const ideas = await Idea.find({
        projectId,
        createdBy: req.user._id,
      }).sort({ createdAt: -1 });

      res.json({ success: true, data: ideas });
    } catch (err) {
      res
        .status(500)
        .json({ success: false, message: "Error fetching project ideas", error: err.message });
    }
  }
}

module.exports = new IdeaController();
