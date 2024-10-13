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
import mainLogo from "../assets/main-logo.png"; // Import the logo image

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
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 8 }}
      >
        {/* Display the logo */}
        <Box
          component="img"
          src={mainLogo}
          alt="Main Logo"
          sx={{ width: 300, height: "auto", mb: 3 }} // Adjust the size and margin
        />

        {/* Form for login */}
        <form onSubmit={handleLogin} style={{ width: "100%" }}>
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
        <Typography variant="body2" sx={{ mt: 2 }}>
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
