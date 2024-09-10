// src/layouts/MainLayout.jsx

import { Box, CssBaseline } from '@mui/material';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <CssBaseline />
      {/* Fixed Navbar */}
      <Navbar />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', pt: 7 }}>
        {children}
      </Box>
      <Footer sx={{ mt: 2 }} />
    </div >
  );
};

export default MainLayout;
