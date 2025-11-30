import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Modal,
} from "@mui/material";
import { projectService } from "../services/project.service";
import { useNavigate } from "react-router-dom";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", description: "" });

  const navigate = useNavigate();

  const loadProjects = async () => {
    try {
      const res = await projectService.getAllProjects();
      setProjects(res.projects);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateProject = async () => {
    if (!newProject.name.trim()) return;

    try {
      await projectService.createProject(newProject);
      setOpen(false);
      setNewProject({ name: "", description: "" });
      loadProjects();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Your Projects
      </Typography>

      <Button variant="contained" onClick={() => setOpen(true)}>
        + Create Project
      </Button>

      {/* List of Projects */}
      <Box sx={{ mt: 4, display: "grid", gap: 2, gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
        {projects.map((project) => (
          <Card
            key={project._id}
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(`/project/${project._id}/taskboard`)}
          >
            <CardContent>
              <Typography variant="h6">{project.name}</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {project.description || "No description"}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Create New Project
          </Typography>

          <TextField
            fullWidth
            label="Project Name"
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Description"
            multiline
            rows={3}
            value={newProject.description}
            onChange={(e) =>
              setNewProject({ ...newProject, description: e.target.value })
            }
            sx={{ mb: 3 }}
          />

          <Button variant="contained" fullWidth onClick={handleCreateProject}>
            Create
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
