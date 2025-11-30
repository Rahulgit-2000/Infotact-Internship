// server/socket/chat.js
const Message = require("../models/message.model");
const jwt = require("jsonwebtoken");

module.exports = function (chatNsp) {
  // Apply auth middleware **only** for chat namespace
  chatNsp.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(); // allow guest (no token)

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // you can store selected user fields
      socket.user = {
        _id: decoded._id || decoded.id || decoded.sub,
        name: decoded.name || decoded.username || decoded.email || "User",
      };
      next();
    } catch (err) {
      console.error("Chat socket auth error:", err.message);
      next(); // allow guest for now; change to next(err) if you want to block
    }
  });

  chatNsp.on("connection", (socket) => {
    console.log("Chat socket connected:", socket.id, "User:", socket.user?.name);

    socket.on("join_room", (projectId) => {
      if (!projectId) return;
      socket.join(projectId);
      console.log(`Socket ${socket.id} joined room ${projectId}`);
    });

    socket.on("send_message", async ({ projectId, text }) => {
      try {
        if (!projectId || !text) return;

        const user = socket.user || { _id: "guest", name: "Guest" };

        const message = await Message.create({
          projectId,
          text,
          senderId: user._id === "guest" ? undefined : user._id,
          senderName: user.name,
        });

        // Broadcast saved message to the room
        chatNsp.to(projectId).emit("receive_message", message);
      } catch (err) {
        console.error("send_message error:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("Chat socket disconnected:", socket.id);
    });
  });
};
