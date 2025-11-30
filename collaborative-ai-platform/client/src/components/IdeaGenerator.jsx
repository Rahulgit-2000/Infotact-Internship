import React, { useState } from 'react';
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
} from '@mui/material';
import { ideaService } from '../services/api.service';

// Clean, minimal and robust IdeaGenerator component
const IdeaGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [category, setCategory] = useState('');
  const [generatedIdea, setGeneratedIdea] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    'Technology',
    'Business',
    'Education',
    'Healthcare',
    'Entertainment',
    'Other',
  ];

  // Generate Ideas
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return setError('Please enter a prompt');

    setLoading(true);
    setError('');

    try {
      const result = await ideaService.generateIdea(prompt, category);
      // API shape: { success: true, data: { ... } }
      setGeneratedIdea(result?.data || null);
    } catch (err) {
      console.error('Generate Idea Error:', err);
      setError(err?.message || (err?.error && err.error) || 'Failed to generate idea');
    } finally {
      setLoading(false);
    }
  };

  // Save only title + summary (lightweight mode)
  const saveIdea = async (idea) => {
    try {
      // Graceful: if ideaService.saveIdea doesn't exist, throw and notify user
      if (!ideaService.saveIdea) throw new Error('Save API not available');

      await ideaService.saveIdea({
        title: idea.title || idea.summary?.slice(0, 80) || 'Untitled',
        description: idea.summary || idea.details || idea.description || '',
        category: category || 'general',
        aiGenerated: true,
      });

      // simple feedback
      alert('Idea saved successfully!');
    } catch (err) {
      console.warn('SaveIdea error:', err);
      alert('Unable to save idea. Please login or try again.');
    }
  };

  // small helper to normalize display for fallback plain responses
  const renderPlainFallback = (gi) => (
    <Box sx={{ mb: 3, p: 2, borderRadius: 2, background: '#fafafa' }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
        {gi.title || 'Idea'}
      </Typography>

      <hr style={{ margin: '6px 0 10px', opacity: 0.4 }} />

      <Typography component="pre" variant="body2" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
        {gi.description || gi.summary || gi.details || ''}
      </Typography>

      <Button
        variant="outlined"
        size="small"
        sx={{ mt: 1 }}
        onClick={() => saveIdea({ title: gi.title || prompt, summary: gi.description || gi.details })}
      >
        Save Idea
      </Button>
    </Box>
  );

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        AI Idea Generator
      </Typography>

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
              placeholder="e.g. top 5 horror movies, mobile productivity app idea, community platform for gamers..."
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Category</InputLabel>
              <Select value={category} label="Category" onChange={(e) => setCategory(e.target.value)}>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button type="submit" variant="contained" color="primary" disabled={loading || !prompt.trim()} fullWidth>
              {loading ? 'Generating...' : 'Generate Idea'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {/* Display generated ideas */}
      {generatedIdea && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Generated Ideas
            </Typography>

            {Array.isArray(generatedIdea.parsedIdeas) && generatedIdea.parsedIdeas.length > 0 ? (
              generatedIdea.parsedIdeas.map((idea, idx) => (
                <Box key={idx} sx={{ mb: 3, p: 2, borderRadius: 2, background: '#fafafa' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {idea.title || `Idea ${idx + 1}`}
                  </Typography>

                  <hr style={{ margin: '6px 0 10px', opacity: 0.4 }} />

                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {idea.summary}
                  </Typography>

                  <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', mt: 1, lineHeight: 1.6 }}>
                    {idea.details}
                  </Typography>

                  <Button variant="outlined" size="small" sx={{ mt: 1 }} onClick={() => saveIdea(idea)}>
                    Save Idea
                  </Button>

                  {idx < generatedIdea.parsedIdeas.length - 1 && <hr style={{ marginTop: 20 }} />}
                </Box>
              ))
            ) : (
              // <-- fallback block: plain text responses (single idea)
              renderPlainFallback(generatedIdea)
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default IdeaGenerator;
