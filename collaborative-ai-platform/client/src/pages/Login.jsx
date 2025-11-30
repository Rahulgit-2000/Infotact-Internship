import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Link,
} from "@mui/material";

import { authService } from "../services/auth.service";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await authService.login(email, password);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));


      window.location.href = "/"; // navigate to home
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f6f8",
        p: 2,
      }}
    >
      <Card sx={{ width: 400, p: 2, boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
            Login
          </Typography>

          {error && (
            <Typography color="error" sx={{ mb: 1 }}>
              {error}
            </Typography>
          )}

          <TextField
            fullWidth
            label="Email"
            sx={{ mb: 2 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            sx={{ mb: 2 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleLogin}
            sx={{ mb: 2 }}
          >
            Login
          </Button>

          <Typography variant="body2" textAlign="center">
            Don’t have an account?{" "}
            <Link href="/register">Register</Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
