import React, { useState } from "react";
import { auth } from "../firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Button, TextField, Container, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Redirect to login page with a success flag to trigger toast
      navigate("/login", { state: { showToast: true } });
    } catch (error: any) {
      console.error(error);
      setError(error.message || "Account creation failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box className="signup-container">
        <Typography variant="h4" gutterBottom>
          Create an Account
        </Typography>
        {error && (
          <Typography className="error" variant="body2">
            {error}
          </Typography>
        )}
        <form onSubmit={handleSignUp} className="signup-form">
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            variant="outlined"
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignUp;
