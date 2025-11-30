// client/src/components/ChatPanel.jsx
import React, { useState, useEffect, useRef } from "react";
import { Box, TextField, Button, Typography, Divider } from "@mui/material";
import io from "socket.io-client";

// connect to chat namespace and send token via auth
const socket = io("http://localhost:5000/chat", {
  auth: {
    token: localStorage.getItem("token"),
  },
});

const ChatPanel = ({ projectId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (!projectId) return;

    socket.emit("join_room", projectId);

    // load historical messages optionally via REST (recommended)
    // Example (optional):
    // fetch(`${API_URL}/api/messages/${projectId}`).then(...)

    socket.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [projectId]);

  const sendMessage = () => {
    if (!message.trim() || !projectId) return;

    socket.emit("send_message", {
      projectId,
      text: message.trim(),
    });

    setMessage("");
  };

  return (
    <Box
      sx={{
        width: "400px",
        height: "100vh",
        borderLeft: "1px solid #ccc",
        display: "flex",
        flexDirection: "column",
        background: "#fafafa",
      }}
    >
      <Box sx={{ p: 2, background: "#1976d2", color: "white" }}>
        <Typography variant="h6">Chat</Typography>
      </Box>

      <Divider />

      <Box sx={{ flexGrow: 1, p: 2, overflowY: "auto" }}>
        {messages.map((m) => (
          <Box key={m._id || Math.random()} sx={{ mb: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>{m.senderName}</Typography>
            <Typography>{m.text}</Typography>
            <Typography variant="caption" color="gray">
              {m.createdAt ? new Date(m.createdAt).toLocaleTimeString() : ""}
            </Typography>
          </Box>
        ))}
        <div ref={messagesEndRef}></div>
      </Box>

      <Box sx={{ p: 2, borderTop: "1px solid #ddd" }}>
        <TextField
          fullWidth
          size="small"
          label="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          inputProps={{ name: "chat-input" }}
        />

        <Button fullWidth variant="contained" sx={{ mt: 1 }} onClick={sendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatPanel;
