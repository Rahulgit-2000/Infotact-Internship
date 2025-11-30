import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Modal,
  TextField,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

import IdeaGenerator from "../components/IdeaGenerator";
import { projectService } from "../services/project.service";

const HomePage = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
  });

  // Load all user projects
  const loadProjects = async () => {
    try {
      const res = await projectService.getAllProjects();
      setProjects(res.projects || []);
    } catch (err) {
      console.error("Failed to load projects:", err);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // Create new project
  const handleCreateProject = async () => {
    if (!projectData.name.trim()) return;

    try {
      await projectService.createProject(projectData);
      setOpenModal(false);
      setProjectData({ name: "", description: "" });
      loadProjects();
    } catch (err) {
      console.error("Failed to create project:", err);
    }
  };

  return (
    <Box sx={{ p: 4 }}>

      {/* 🔥 SECTION 1 — AI IDEA GENERATOR */}
      <Typography variant="h4" fontWeight="bold" mb={3}>
        AI Idea Generator
      </Typography>

      <Box sx={{ mb: 6 }}>
        <IdeaGenerator />
      </Box>

      {/* 🔥 SECTION 2 — PROJECTS */}
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Your Projects
      </Typography>

      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project._id}>
            <Card
              sx={{
                cursor: "pointer",
                borderRadius: 3,
                p: 1,
                transition: "0.2s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                },
              }}
              onClick={() =>
                navigate(`/project/${project._id}/taskboard`)
              }
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {project.name}
                </Typography>

                <Typography variant="body2" color="text.secondary" mt={1}>
                  {project.description || "No description"}
                </Typography>

                <Typography
                  variant="caption"
                  color="primary"
                  sx={{ display: "block", mt: 2 }}
                >
                  Created by: {project.createdBy?.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {projects.length === 0 && (
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mt: 5, width: "100%", textAlign: "center" }}
          >
            No projects yet — create one!
          </Typography>
        )}
      </Grid>

      {/* Floating Button */}
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
        }}
        onClick={() => setOpenModal(true)}
      >
        <AddIcon />
      </Fab>

      {/* CREATE PROJECT MODAL */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            width: 400,
            bgcolor: "white",
            p: 4,
            borderRadius: 3,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: 3,
          }}
        >
          <Typography variant="h6" mb={2}>
            Create New Project
          </Typography>

          <TextField
            label="Project Name"
            fullWidth
            value={projectData.name}
            onChange={(e) =>
              setProjectData({ ...projectData, name: e.target.value })
            }
            sx={{ mb: 2 }}
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={projectData.description}
            onChange={(e) =>
              setProjectData({ ...projectData, description: e.target.value })
            }
            sx={{ mb: 3 }}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleCreateProject}
          >
            Create Project
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default HomePage;
