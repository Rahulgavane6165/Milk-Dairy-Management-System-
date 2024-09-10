import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" color="default" className="bg-gray-100 dark:bg-gray-800">
      <Toolbar
        className="flex justify-between items-center"
        sx={{ px: { xs: 4, md: 8 }, py: { xs: 0, md: 0 }, minHeight: { xs: 'auto', md: 50 } }}>
        <Typography variant="h6" className="text-gray-800 dark:text-gray-200">
          <Link to="/" className="no-underline">MyApp</Link>
        </Typography>
        <div className="hidden md:flex gap-4">
          <Link to="/dashboard" className="text-gray-800 dark:text-gray-200">Dashboard</Link>
          <Link to="/collection" className="text-gray-800 dark:text-gray-200">Collection</Link>
          <Link to="/product" className="text-gray-800 dark:text-gray-200">Product</Link>
          <Link to="/about" className="text-gray-800 dark:text-gray-200">About</Link>
          <Link to="/contact-us" className="text-gray-800 dark:text-gray-200">ContactUs</Link>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen} sx={{ display: { xs: 'block', md: 'none' } }}>
            <MenuIcon />
          </IconButton>
        </div>
      </Toolbar>
      <Menu id="menu-appbar" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} sx={{ display: { xs: 'block', md: 'none' } }} >
        <MenuItem onClick={handleMenuClose}>
          <Link to="/dashboard" className="text-gray-800 dark:text-gray-200">Dashboard</Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link to="/product" className="text-gray-800 dark:text-gray-200">Product</Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link to="/about" className="text-gray-800 dark:text-gray-200">About</Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link to="/contact-us" className="text-gray-800 dark:text-gray-200">ContactUs</Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link to="/collection" className="text-gray-800 dark:text-gray-200">Collection</Link>
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
