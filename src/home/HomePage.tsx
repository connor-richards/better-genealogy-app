import React from "react";
import { Container, Typography } from "@mui/material";
import { useAuth } from "../auth/AuthProvider"; // Import auth state
import Taskbar from "../components/Taskbar"; // Taskbar component

const HomePage = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <Taskbar /> {/* Show the taskbar with logout */}
      <Container>
        <Typography variant="h4" sx={{ mt: 4 }}>
          Welcome, {currentUser?.email}!
        </Typography>
      </Container>
    </>
  );
};

export default HomePage;
