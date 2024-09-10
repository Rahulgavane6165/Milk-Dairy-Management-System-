// src/layouts/MainLayout.jsx

import { Box, CssBaseline } from '@mui/material';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import React from 'react';
import Sidebar from '../components/Sidebar';

const DashboardLayoutLayout = ({ children, profileData, handleLogout }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
            <CssBaseline />
            {/* Fixed Navbar */}
            <Navbar />
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', pt: 7 }}> {/* Adjust pt (padding-top) to the height of the fixed Navbar */}
                <Box sx={{ display: 'flex', flexGrow: 1 }}>
                    <Sidebar profileData={profileData} handleLogout={handleLogout} />
                    <Box sx={{ flexGrow: 1, ml: 32, overflowY: 'auto' }}>
                        {children}
                    </Box>
                </Box>
                <Footer sx={{ mt: 2 }} /> {/* Margin-top to ensure space above the footer */}
            </Box>
        </div>
    );
};

export default DashboardLayoutLayout;
