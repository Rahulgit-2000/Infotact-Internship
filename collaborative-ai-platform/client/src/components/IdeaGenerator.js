// client/src/components/IdeaGenerator.js
import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Divider,
} from "@mui/material";
import { ideaService } from "../services/api.service";

const IdeaGenerator = ({ projectId = null }) => {
  const [prompt, setPrompt] = useState("");
  const [category, setCategory] = useState("");
  const [generatedIdea, setGeneratedIdea] = useState(null);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [error, setError] = useState("");

  const [savedIdeas, setSavedIdeas] = useState([]);

  const categories = [
    "Technology",
    "Business",
    "Education",
    "Healthcare",
    "Entertainment",
    "Other",
  ];

  // ---------- LOAD SAVED IDEAS ----------
  const loadSavedIdeas = useCallback(async () => {
    try {
      setHistoryLoading(true);

      let res;
      if (projectId) {
        // ideas only for this project
        res = await ideaService.getIdeasByProject(projectId);
      } else {
        // all ideas of this user
        res = await ideaService.getMyIdeas();
      }

      setSavedIdeas(res.data || []);
    } catch (err) {
      console.error("Failed to load saved ideas:", err);
    } finally {
      setHistoryLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    loadSavedIdeas();
  }, [loadSavedIdeas]);

  // Cleanup helper for description
  const cleanText = (t) => {
    if (!t || typeof t !== "string") return "";
    let s = t;
    s = s.replace(/\*+/g, ""); // remove markdown **
    s = s.replace(/\n{3,}/g, "\n\n");
    return s.trim();
  };

  // ---------- HANDLE SUBMIT ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await ideaService.generateIdea(prompt, category, projectId);
      setGeneratedIdea(result.data);

      // If backend actually saved it (logged-in user) → refresh history
      if (result.data && result.data.saved) {
        loadSavedIdeas();
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to generate idea");
    } finally {
      setLoading(false);
    }
  };

  // ---------- RENDER ----------
  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        AI Idea Generator
      </Typography>

      {projectId && (
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          Linked to project: <strong>{projectId}</strong>
        </Typography>
      )}

      {/* GENERATE FORM */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Enter your prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              multiline
              rows={3}
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading || !prompt || !category}
              fullWidth
            >
              {loading ? "Generating..." : "Generate Idea"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {/* LAST GENERATED IDEA (preview) */}
      {generatedIdea && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Generated Idea
            </Typography>
            {generatedIdea.parsedIdeas &&
            generatedIdea.parsedIdeas.length > 0 ? (
              generatedIdea.parsedIdeas.map((idea, idx) => (
                <Box key={idx} sx={{ mb: 2 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold" }}
                  >
                    {idea.title}
                  </Typography>
                  {idea.summary && (
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {idea.summary}
                    </Typography>
                  )}
                  {idea.details && (
                    <Typography
                      variant="body2"
                      sx={{ whiteSpace: "pre-wrap" }}
                    >
                      {idea.details}
                    </Typography>
                  )}
                  {idx <
                    generatedIdea.parsedIdeas.length - 1 && <Divider sx={{ mt: 2 }} />}
                </Box>
              ))
            ) : (
              <Typography
                component="pre"
                variant="body1"
                sx={{ whiteSpace: "pre-wrap" }}
              >
                {cleanText(generatedIdea.description)}
              </Typography>
            )}

            {generatedIdea.saved === false && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 1, display: "block" }}
              >
                (Login and regenerate to save this idea.)
              </Typography>
            )}
          </CardContent>
        </Card>
      )}

      {/* SAVED IDEAS LIST */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Saved Ideas {projectId ? "for this Project" : " (All My Ideas)"}
        </Typography>

        {historyLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}

        {!historyLoading && savedIdeas.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            No saved ideas yet.
          </Typography>
        )}

        {!historyLoading &&
          savedIdeas.map((idea) => (
            <Card key={idea._id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {idea.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ whiteSpace: "pre-wrap", mt: 1 }}
                >
                  {cleanText(idea.description)}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mt: 1 }}
                >
                  {idea.category || "general"} •{" "}
                  {new Date(idea.createdAt).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          ))}
      </Box>
    </Box>
  );
};

export default IdeaGenerator;
