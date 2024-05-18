import React from "react";
import { Typography, Box } from "@mui/material";
import CredilinqLogo from "./logo.svg"; 


const Header = () => {
  return (
    <Box sx={{ backgroundColor: "#5E0D71", padding: "16px 16px" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
        <a href="/">
          <img
            src={CredilinqLogo}
            alt="Credilinq Logo"
            style={{ height: "40px", marginRight: "16px", cursor: "pointer" }}
          />
        </a>
        <Typography variant="h6" component="div" sx={{ color: "white" }}>
          SME Health Check - Get Started
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
