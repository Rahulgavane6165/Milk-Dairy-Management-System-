import { Avatar, Box, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Dashboard, DataUsage, ExitToApp, History, Home as HomeIcon, Person } from '@mui/icons-material'; // Import DataUsage for Milk Data

import React from 'react';
import { currentViewState } from '../recoil/dashboardAtom'; // Import the atom
import { useSetRecoilState } from 'recoil';

const Sidebar = ({ profileData, handleLogout }) => {
  const setCurrentView = useSetRecoilState(currentViewState);

  return (
    <Box position="fixed" color="default" className="bg-gray-100 dark:bg-gray-800" sx={{ width: 260, p: 2, borderRight: 1, borderColor: 'divider', height: '96vh', top: 60, left: 0 }}>
      {/* User Profile Section */}
      <Box sx={{ mb: 2, textAlign: 'center' }}>
        <Avatar sx={{ bgcolor: 'primary.main', width: 150, height: 150, mx: 'auto' }} src='/images/profile.png'>
          {!profileData.profilePhoto && profileData.name?.[0]}
        </Avatar>
        <Typography variant="h6" sx={{ mt: 1 }}>
          {profileData.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {profileData.userType}
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <List>
        <ListItem button onClick={() => setCurrentView('home')} sx={{ cursor: 'pointer' }}>
          <ListItemIcon><HomeIcon /></ListItemIcon> {/* Home icon */}
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => setCurrentView('overview')} sx={{ cursor: 'pointer' }}>
          <ListItemIcon><Dashboard /></ListItemIcon> {/* Overview icon */}
          <ListItemText primary="Overview" />
        </ListItem>
        <ListItem button onClick={() => setCurrentView('profile')} sx={{ cursor: 'pointer' }}>
          <ListItemIcon><Person /></ListItemIcon> {/* Profile icon */}
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button onClick={() => setCurrentView('milkData')} sx={{ cursor: 'pointer' }}>
          <ListItemIcon><DataUsage /></ListItemIcon> {/* Milk Data icon */}
          <ListItemText primary="Milk Data" />
        </ListItem>
        <ListItem button onClick={() => setCurrentView('orderHistory')} sx={{ cursor: 'pointer' }}>
          <ListItemIcon><History /></ListItemIcon> {/* History icon */}
          <ListItemText primary="Order History" />
        </ListItem>
        <Divider sx={{ my: 2 }} />
        <ListItem button onClick={handleLogout} sx={{ cursor: 'pointer' }}>
          <ListItemIcon><ExitToApp /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
