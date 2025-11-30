const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    projectId: { type: String, required: true, index: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    senderName: { type: String, required: true, default: "Guest" },
    text: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
