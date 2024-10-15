import React, { useState, useEffect } from "react";
import { auth } from "../firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  Button,
  TextField,
  Container,
  Box,
  Typography,
  Link,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import mainLogo from "../assets/logo1024.png";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();

  useEffect(() => {
    // Show success toast if redirected from sign-up
    if (location.state?.showToast) {
      toast.success("Account created successfully. Please log in.", {
        position: "top-center",
        autoClose: 5000, // Automatically closes after 5 seconds
      });
    }
  }, [location.state]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error(error);
      // Show error toast when login fails
      toast.error("Login failed. Please check your credentials.", {
        position: "top-center",
        autoClose: 5000, // Automatically closes after 5 seconds
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <ToastContainer /> {/* Toast container to display the toast */}
      <Box className="login-container">
        <Box
          component="img"
          src={mainLogo}
          alt="Main Logo"
          className="login-logo"
        />

        <form onSubmit={handleLogin} className="login-form">
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Login
          </Button>
        </form>

        <Typography variant="body2" className="signup-link">
          Don't have an account?{" "}
          <Link component={RouterLink} to="/signup">
            Sign up here
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
