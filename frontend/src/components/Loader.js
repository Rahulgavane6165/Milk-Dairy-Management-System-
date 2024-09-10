// src/components/LoadingPage.js

import { Box, CircularProgress, useTheme } from '@mui/material';

import React from 'react';

const LoadingPage = () => {
  const theme = useTheme();
  
  return (
    <Box 
      sx={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: theme.palette.background.default + '80', // Transparent background
        zIndex: 9999 
      }}
    >
      <CircularProgress sx={{ color: theme.palette.primary.main }} />
    </Box>
  );
};

export default LoadingPage;
