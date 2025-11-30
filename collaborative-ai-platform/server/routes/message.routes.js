const express = require("express");
const router = express.Router({ mergeParams: true });
const messageController = require("../controllers/message.controller");

// GET message history for a project
router.get("/:projectId/messages", messageController.getMessages.bind(messageController));

// Optional REST fallback to create a message
router.post("/:projectId/messages", messageController.createMessage.bind(messageController));

module.exports = router;
