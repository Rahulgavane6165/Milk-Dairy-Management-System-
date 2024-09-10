import { Avatar, Box, Button, Card, CardContent, CardMedia, Container, Divider, Grid, Paper, TextField, Typography } from '@mui/material';
import { Call as CallIcon, Email as EmailIcon, LocationOn as LocationOnIcon, Send as SendIcon } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';

import AuthLayout from '../layouts/AuthLayout';
import React from 'react';
import { sendEmail } from '../api/email';
import { useSnackbar } from '../hooks/useSnackbar';

// Dummy contact details
const contactDetails = {
    phone: '+123 456 7890',
    email: 'contact@dairyfresh.com',
    address: '123 Dairy Lane, Countryville'
};

const ContactUs = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const showSnackbar = useSnackbar();

    const onSubmit = async (data) => {
        console.log('Form data:', data);
        try {
            await sendEmail(data)
            showSnackbar({ message: 'Request recieved', severity: 'info' });
        } catch {
            showSnackbar({ message: 'Faliled to send a request', severity: 'error' });

        }
    };

    return (
        <AuthLayout>
            <Container maxWidth="lg" sx={{ mt: 6 }}>
                {/* Header Section */}
                <Paper elevation={3} sx={{ py: 5, textAlign: 'center', backgroundColor: '#f5f5f5', mb: 4 }} className='bg-gray-50 dark:bg-gray-900'>
                    <Typography variant="h4" gutterBottom sx={{ color: '#7e57c2', fontWeight: 'bold' }}>
                        Contact Us
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#6F3694' }}>
                        We'd love to hear from you! Reach out to us for any inquiries or support.
                    </Typography>
                </Paper>

                {/* Contact Details Section */}
                <Grid container spacing={4} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ textAlign: 'center', p: 3, borderRadius: '10px', boxShadow: 3 }} className='bg-gray-50 dark:bg-gray-900'>
                            <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: '#7e57c2' }}>
                                <CallIcon />
                            </Avatar>
                            <Typography variant="h6" sx={{ color: '#6F3694', mb: 1 }}>
                                Phone
                            </Typography>
                            <Typography variant="body1">
                                {contactDetails.phone}
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ textAlign: 'center', p: 3, borderRadius: '10px', boxShadow: 3 }} className='bg-gray-50 dark:bg-gray-900'>
                            <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: '#7e57c2' }}>
                                <EmailIcon />
                            </Avatar>
                            <Typography variant="h6" sx={{ color: '#6F3694', mb: 1 }}>
                                Email
                            </Typography>
                            <Typography variant="body1">
                                {contactDetails.email}
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ textAlign: 'center', p: 3, borderRadius: '10px', boxShadow: 3 }} className='bg-gray-50 dark:bg-gray-900'>
                            <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: '#7e57c2' }}>
                                <LocationOnIcon />
                            </Avatar>
                            <Typography variant="h6" sx={{ color: '#6F3694', mb: 1 }}>
                                Address
                            </Typography>
                            <Typography variant="body1">
                                {contactDetails.address}
                            </Typography>
                        </Card>
                    </Grid>
                </Grid>

                {/* Contact Form Section */}
                <Paper elevation={3} sx={{ py: 5, mb: 4, backgroundColor: '#f5f5f5' }} className='bg-gray-50 dark:bg-gray-900'>
                    <Typography variant="h4" sx={{ textAlign: 'center', color: '#7e57c2', mb: 3, fontWeight: 'bold' }}>
                        Send Us a Message
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)} className='p-4'>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={12}>
                                <Controller
                                    name="name"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: 'Name is required' }}
                                    render={({ field }) => (
                                        <TextField
                                            fullWidth
                                            label="Name"
                                            {...field}
                                            size='small'
                                            error={!!errors.name}
                                            helperText={errors.name?.message}
                                            variant="outlined"
                                            sx={{ mb: 2 }}
                                        />
                                    )}
                                />
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: 'Email is required' }}
                                    render={({ field }) => (
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            type="email"
                                            {...field}
                                            size='small'
                                            error={!!errors.email}
                                            helperText={errors.email?.message}
                                            variant="outlined"
                                            sx={{ mb: 2 }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="message"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: 'Message is required' }}
                                    render={({ field }) => (
                                        <TextField
                                            fullWidth
                                            label="Message"
                                            {...field}
                                            multiline
                                            rows={4}
                                            size='small'
                                            error={!!errors.message}
                                            helperText={errors.message?.message}
                                            variant="outlined"
                                            sx={{ mb: 2 }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size='small'
                                    endIcon={<SendIcon />}
                                    fullWidth
                                    sx={{ py: 1 }}
                                >
                                    Send Message
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>

                {/* Additional Information Section */}
                <Box sx={{ py: 5, textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ color: '#7e57c2', mb: 3, fontWeight: 'bold' }}>
                        Why Contact Us?
                    </Typography>
                    <Typography variant="body1" sx={{ maxWidth: '800px', mx: 'auto', mb: 2 }}>
                        Our team is dedicated to providing you with the best support and answers to any questions you may have. Whether you have
                        inquiries about our products, need assistance with an order, or have feedback to share, we're here to help. Contact us
                        anytime, and we'll get back to you as soon as possible.
                    </Typography>
                    <Divider sx={{ my: 4 }} />
                    <Typography variant="body1">
                        Your satisfaction is our priority. We value your feedback and strive to improve our services based on your input.
                        Don't hesitate to reach out and let us know how we can serve you better.
                    </Typography>
                </Box>

                {/* Map Section */}
                <Box sx={{ mt: 5 }}>
                    <Typography variant="h5" sx={{ textAlign: 'center', color: '#7e57c2', mb: 3, fontWeight: 'bold' }}>
                        Find Us On The Map
                    </Typography>
                </Box>
            </Container>
        </AuthLayout>
    );
};

export default ContactUs;
