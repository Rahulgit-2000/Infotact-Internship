import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Avatar, Menu, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  // Load user info from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Logout user
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    navigate("/login");
  };

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar position="static" color="primary">
      <Toolbar>

        {/* LOGO / Brand */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          AI Collaboration Platform
        </Typography>

        {/* Navigation Buttons */}
        <Button color="inherit" component={Link} to="/">
          Idea Generator
        </Button>

        <Button color="inherit" component={Link} to="/whiteboard/default-room">
          Whiteboard
        </Button>

        {/* RIGHT SIDE — Authentication Area */}
        {!user ? (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>

            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        ) : (
          <>
            <Box onClick={handleMenuOpen} sx={{ cursor: "pointer" }}>
              <Avatar sx={{ bgcolor: "#fff", color: "#1976d2" }}>
                {user.name?.charAt(0).toUpperCase()}
              </Avatar>
            </Box>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem disabled>{user.name}</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
