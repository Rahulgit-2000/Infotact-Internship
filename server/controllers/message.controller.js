const Message = require("../models/message.model");

class MessageController {
  // GET /api/projects/:projectId/messages
  async getMessages(req, res) {
    try {
      const { projectId } = req.params;
      // return last 100 messages (oldest first)
      const messages = await Message.find({ projectId })
        .sort({ createdAt: 1 })
        .limit(100)
        .lean();
      return res.status(200).json({ success: true, data: messages });
    } catch (err) {
      console.error("Error fetching messages:", err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  // POST /api/projects/:projectId/messages
  // (fallback REST endpoint — socket saving is primary)
  async createMessage(req, res) {
    try {
      const { projectId } = req.params;
      const { text, senderId, senderName } = req.body;

      if (!text || !projectId) {
        return res.status(400).json({ success: false, message: "projectId and text required" });
      }

      const message = new Message({
        projectId,
        text,
        senderId: senderId || undefined,
        senderName: senderName || "Guest"
      });

      await message.save();
      return res.status(201).json({ success: true, data: message });
    } catch (err) {
      console.error("Error creating message:", err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }
}

module.exports = new MessageController();
