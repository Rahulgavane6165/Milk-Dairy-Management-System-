// src/layouts/MainLayout.jsx

import { Box, CssBaseline } from '@mui/material';

import Footer from '../components/Footer';
import Header from '../components/Header';
import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <CssBaseline />
      {/* Fixed Navbar */}
      <Header />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '92vh', pt: 7, alignItems:'center', justifyContent:'center' }}>
        {children}
      </Box>
      <Footer sx={{ mt: 2 }} />
    </div >
  );
};

export default AuthLayout;
