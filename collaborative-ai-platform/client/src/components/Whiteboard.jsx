import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { Box, Slider, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ChatPanel from "./ChatPanel";

const socket = io("http://localhost:5000/whiteboard");

const Whiteboard = ({ projectId = "default-room" }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const lastPos = useRef({ x: 0, y: 0 });

  const [brushColor, setBrushColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(4);
  const [isDrawing, setIsDrawing] = useState(false);

  // ----------------------------------------------------
  // INITIAL SETUP (runs ONCE per project)
  // ----------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.75;
    canvas.height = window.innerHeight * 0.75;

    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctxRef.current = ctx;

    socket.emit("join_room", projectId);

    socket.on("drawing", (payload) => {
      if (!payload || !payload.data) return;
      const { x0, y0, x1, y1, color, size } = payload.data;
      drawLine(x0, y0, x1, y1, false, color, size);
    });

    socket.on("clear_board", () => clearCanvas(false));

    return () => {
      socket.off("drawing");
      socket.off("clear_board");
    };
  }, [projectId]);

  // ----------------------------------------------------
  // UPDATE ONLY BRUSH SETTINGS (does NOT clear the canvas)
  // ----------------------------------------------------
  useEffect(() => {
    if (!ctxRef.current) return;
    ctxRef.current.strokeStyle = brushColor;
    ctxRef.current.lineWidth = brushSize;
  }, [brushColor, brushSize]);

  // --------------------
  // Drawing functions
  // --------------------

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    const pos = getPos(e);
    lastPos.current = pos;
  };

  const stopDrawing = () => setIsDrawing(false);

  const draw = (e) => {
    if (!isDrawing) return;

    const pos = getPos(e);

    drawLine(
      lastPos.current.x,
      lastPos.current.y,
      pos.x,
      pos.y,
      true,
      brushColor,
      brushSize
    );

    lastPos.current = pos;
  };

  const drawLine = (x0, y0, x1, y1, emit, color, size) => {
    const ctx = ctxRef.current;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = size;

    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    ctx.closePath();

    if (!emit) return;

    socket.emit("drawing", {
      projectId,
      data: { x0, y0, x1, y1, color, size },
    });
  };

  // Clear board
  const clearCanvas = (emit = true) => {
    const canvas = canvasRef.current;
    ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);

    if (emit) {
      socket.emit("clear_board", projectId);
    }
  };

  // --------------------
  // UI
  // --------------------
 return (
  <Box sx={{ display: "flex", height: "100vh" }}>

    {/* LEFT SIDE — WHITEBOARD AREA */}
    <Box sx={{ flexGrow: 1, p: 2 }}>

      {/* Toolbar */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
          background: "#f5f5f5",
          padding: "10px 20px",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        }}
      >
        {/* Color Picker */}
        <Box>
          <Typography variant="caption">Color</Typography>
          <input
            type="color"
            value={brushColor}
            onChange={(e) => setBrushColor(e.target.value)}
            style={{
              width: "40px",
              height: "40px",
              border: "none",
              background: "transparent",
            }}
          />
        </Box>

        {/* Brush Size */}
        <Box sx={{ width: 150 }}>
          <Typography variant="caption">Brush Size</Typography>
          <Slider
            min={1}
            max={30}
            value={brushSize}
            onChange={(e, val) => setBrushSize(val)}
          />
        </Box>

        {/* Clear */}
        <IconButton
          color="error"
          onClick={() => clearCanvas(true)}
          sx={{
            background: "#fff",
            borderRadius: "8px",
            border: "1px solid #ccc",
            "&:hover": { background: "#ffe3e3" },
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{
          border: "2px solid #333",
          borderRadius: "8px",
          background: "#fff",
          cursor: "crosshair",
        }}
      />
    </Box>

    {/* RIGHT SIDE — CHAT PANEL */}
    <ChatPanel projectId={projectId} />
  </Box>
);

};

export default Whiteboard;
