import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider"; // Import Auth context
import mainLogo from "../assets/logo1024.png"; // Import the logo image
import { useNavigate } from "react-router-dom"; // For navigation
import "./Taskbar.css"; // Import the CSS file

const Taskbar = () => {
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate(); // To navigate to homepage when the logo is clicked

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  const handleLogoClick = () => {
    navigate("/home"); // Navigate to homepage when logo is clicked
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Combined logo and text as a clickable button */}
        <Button
          color="inherit"
          onClick={handleLogoClick}
          className="taskbar-button"
        >
          <Box
            component="img"
            src={mainLogo}
            alt="Main Logo"
            className="taskbar-logo"
          />
          <Typography variant="h6">Better Genealogy</Typography>
        </Button>

        {/* Hamburger menu */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
          className="menu-icon"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Taskbar;
