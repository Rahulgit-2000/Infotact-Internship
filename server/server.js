// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const socketIo = require("socket.io");
const http = require("http");

dotenv.config();

// ---------------------------
// INITIALIZE APP + SERVER
// ---------------------------
const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// ---------------------------
// MIDDLEWARE
// ---------------------------
app.use(cors());
app.use(express.json());

// ---------------------------
// MONGODB CONNECTION
// ---------------------------
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ---------------------------
// SOCKET NAMESPACES (whiteboard & chat)
// ---------------------------
const whiteboardNsp = io.of("/whiteboard");
const chatNsp = io.of("/chat");

// Attach socket modules (they expect namespace object)
const whiteboardSocket = require("./socket/whiteboard");
const chatSocket = require("./socket/chat");

whiteboardSocket(whiteboardNsp);
chatSocket(chatNsp);

// ---------------------------
// ROUTES
// ---------------------------
const ideaRoutes = require("./routes/idea.routes");
const projectRoutes = require("./routes/project.routes");
const messageRoutes = require("./routes/message.routes");
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");

app.use("/api/ideas", ideaRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/projects", messageRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Basic API test
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the AI-Powered Ideation Platform API" });
});

// ---------------------------
// ERROR HANDLER
// ---------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// ---------------------------
// START SERVER
// ---------------------------
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
