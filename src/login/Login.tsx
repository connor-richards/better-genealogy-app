import React, { useState } from "react";
import { auth } from "../firebaseconfig"; // Import Firebase services
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  Button,
  TextField,
  Container,
  Box,
  Typography,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom"; // Use RouterLink for internal routing
import mainLogo from "../assets/logo1024.png"; // Import the logo image
import "./Login.css"; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful");
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box className="login-container">
        {/* Display the logo */}
        <Box
          component="img"
          src={mainLogo}
          alt="Main Logo"
          className="login-logo"
        />

        {/* Form for login */}
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

        {/* Link to Sign-Up page */}
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
