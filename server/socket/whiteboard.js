// server/socket/whiteboard.js
module.exports = function (whiteboardNsp) {
  whiteboardNsp.on("connection", (socket) => {
    console.log("Whiteboard socket connected:", socket.id);

    // Join project room
    socket.on("join_room", (projectId) => {
      if (!projectId) return;
      socket.join(projectId);
      console.log(`User ${socket.id} joined whiteboard room ${projectId}`);
    });

    // Receive drawing data & broadcast it
    socket.on("drawing", ({ projectId, data }) => {
      if (!projectId || !data) return;
      // Broadcast the raw data object to others in the room
      socket.to(projectId).emit("drawing", { data });
    });

    // Clear board event
    socket.on("clear_board", (projectId) => {
      if (!projectId) return;
      socket.to(projectId).emit("clear_board");
    });

    socket.on("disconnect", () => {
      console.log("Whiteboard socket disconnected:", socket.id);
    });
  });
};
