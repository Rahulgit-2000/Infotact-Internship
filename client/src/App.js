import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar'; 
import HomePage from './pages/HomePage';
import IdeaGenerator from './components/IdeaGenerator';
import Whiteboard from "./components/Whiteboard";
import Projects from "./pages/Projects";
import Taskboard from "./components/Taskboard";


// ADD THESE
import Login from "./pages/Login";
import Register from "./pages/Register";

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <Navbar />

        <Routes>
  {/* Home */}
  <Route path="/" element={<HomePage />} />

  {/* Authentication */}
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  {/* Projects Page */}
  <Route path="/projects" element={<Projects />} />
  
  {/* idea Page */}
  <Route path="/idea-generator" element={<IdeaGenerator />} />

  {/* Kanban Taskboard */}
  <Route path="/project/:projectId/taskboard" element={<Taskboard />} />

  {/* Whiteboard */}
  <Route path="/whiteboard/:projectId" element={<Whiteboard />} />
</Routes>

      </Router>
    </ThemeProvider>
  );
}

export default App;
