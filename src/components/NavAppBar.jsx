import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import useMenu from "../hooks/useMenu";

export default function NavAppBar({ onLogout }) {
  const { menuAnchor, isMenuOpen, handleMenuOpen, handleMenuClose } = useMenu();

  return (
    <Box>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            aria-haspopup="true"
            aria-expanded={isMenuOpen}
            onClick={handleMenuOpen}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            open={isMenuOpen}
            onClose={handleMenuClose}
          >
            <MenuItem component={Link} to="/" onClick={handleMenuClose}>
              My Lists
            </MenuItem>

            <MenuItem component={Link} to="/friends" onClick={handleMenuClose}>
              Friends
            </MenuItem>

            <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
              Profile
            </MenuItem>

            <Divider />

            <MenuItem onClick={onLogout}>Log out</MenuItem>
          </Menu>

          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Media Diary
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
