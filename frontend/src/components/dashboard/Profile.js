// components/dashboard/Profile.js

import { AccountBalance, CreditCard, Edit, Email, Home, Map, Person } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Divider, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';

import React from 'react';
import { jwtDecode } from 'jwt-decode';
import { updateUserDetails } from '../../api/user'; // Fetch & update user details

const Profile = ({ profileData, setProfileData, showSnackbar }) => {
    const [isEditing, setIsEditing] = React.useState(false);

    const handleProfileChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSaveProfile = async () => {
        const token = localStorage.getItem('authToken');
        const userId = jwtDecode(token).id;
        try {
            await updateUserDetails(userId, profileData);
            setIsEditing(false);
            showSnackbar({ message: 'Profile updated successfully', severity: 'success' });
        } catch (err) {
            showSnackbar({ message: err.message, severity: 'error' });
        }
    };

    return (
        // <div >
        <Card sx={{ mb: 4 }} className="bg-gray-50 dark:bg-gray-900">
            <CardContent>
                {isEditing ? (
                    <Box component="form" noValidate autoComplete="on" sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={6}>
                                <TextField label="Name" name="name" value={profileData.name} onChange={handleProfileChange} fullWidth margin="normal" size="small"
                                    InputProps={{ startAdornment: <InputAdornment position="start"><Person color="action" /></InputAdornment> }} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField label="Email" name="email" value={profileData.email} onChange={handleProfileChange} fullWidth margin="normal" size="small"
                                    InputProps={{ startAdornment: <InputAdornment position="start"><Email color="action" /></InputAdornment> }} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField label="Address" name="address" value={profileData.address} onChange={handleProfileChange} fullWidth margin="normal" size="small"
                                    InputProps={{ startAdornment: <InputAdornment position="start"><Home color="action" /></InputAdornment> }} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField label="Aadhar Number" name="adhar_number" value={profileData.adhar_number} onChange={handleProfileChange} fullWidth margin="normal" size="small"
                                    InputProps={{ startAdornment: <InputAdornment position="start"><CreditCard color="action" /></InputAdornment> }} />
                            </Grid>
                            <Grid item xs={12} md={9}>
                                <TextField label="Bank Account Number" name="bank_account_number" value={profileData.bank_account_number} onChange={handleProfileChange} fullWidth margin="normal" size="small"
                                    InputProps={{ startAdornment: <InputAdornment position="start"><AccountBalance color="action" /></InputAdornment> }} />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField label="IFSC Code" name="ifsc_code" value={profileData.ifsc_code} onChange={handleProfileChange} fullWidth margin="normal" size="small"
                                    InputProps={{ startAdornment: <InputAdornment position="start"><Map color="action" /></InputAdornment> }} />
                            </Grid>
                        </Grid>
                        <Box mt={2}>
                            <Button variant="contained" color="primary" onClick={handleSaveProfile}>Save</Button>
                            <Button variant="outlined" color="secondary" onClick={handleEditToggle} sx={{ ml: 2 }}>Cancel</Button>
                        </Box>
                    </Box>
                ) : (
                    <Card sx={{ p: 1, boxShadow: 3, borderRadius: 2 }} className="bg-gray-50 dark:bg-gray-900">
                        <CardContent>
                            <div className="flex justify-between items-center">
                                <Typography variant="h6" color="primary" gutterBottom>
                                    User Profile
                                </Typography>
                                <IconButton size="small" variant="outlined" color="primary" onClick={handleEditToggle} > <Edit /> </IconButton>
                            </div>
                            <Divider sx={{ mb: 2 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="body1" color="textSecondary">
                                        <Person sx={{ mr: 1 }} /> <strong>Name:</strong> {profileData.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="body1" color="textSecondary">
                                        <Email sx={{ mr: 1 }} /> <strong>Email:</strong> {profileData.email}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="body1" color="textSecondary">
                                        <Home sx={{ mr: 1 }} /> <strong>Address:</strong> {profileData.address}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="body1" color="textSecondary">
                                        <CreditCard sx={{ mr: 1 }} /> <strong>Aadhar Number:</strong> {profileData.adhar_number}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="body1" color="textSecondary">
                                        <AccountBalance sx={{ mr: 1 }} /> <strong>Account Number:</strong> {profileData.bank_account_number}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="body1" color="textSecondary">
                                        <Map sx={{ mr: 1 }} /> <strong>IFSC Number:</strong> {profileData.ifsc_code}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                )}
            </CardContent>
        </Card>
    );
};

export default Profile;
