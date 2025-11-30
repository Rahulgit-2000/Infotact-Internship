// client/src/components/EditTaskModal.jsx
import React, { useEffect, useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 360,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  borderRadius: 2,
};

const EditTaskModal = ({ open, initialText, onClose, onSave }) => {
  const [text, setText] = useState(initialText || "");

  useEffect(() => {
    setText(initialText || "");
  }, [initialText]);

  const handleSave = () => {
    if (!text.trim()) return;
    onSave(text.trim());
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="edit-task-title">
      <Box sx={style}>
        <Typography id="edit-task-title" variant="h6" sx={{ mb: 1 }}>
          Edit Task
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditTaskModal;
