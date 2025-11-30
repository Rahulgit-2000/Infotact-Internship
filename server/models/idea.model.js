// server/models/idea.model.js
const mongoose = require("mongoose");

const IdeaSchema = new mongoose.Schema(
  {
    // Optional: link idea to a project
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      default: null,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "general",
    },

    // Logged in user who generated/saved it
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    aiGenerated: {
      type: Boolean,
      default: true,
    },

    // optional richer structure if you want later
    parsedIdeas: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Idea", IdeaSchema);
