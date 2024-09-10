import { Avatar, Box, Button, Card, CardContent, CardMedia, Container, Grid, Paper, Typography } from '@mui/material';

import AuthLayout from '../layouts/AuthLayout';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import GrassIcon from '@mui/icons-material/Grass';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MedicationIcon from '@mui/icons-material/Medication';
import MilkIcon from '@mui/icons-material/EmojiFoodBeverage';
import React from 'react';
import VerifiedIcon from '@mui/icons-material/Verified';
import farmerImage from '../assets/farmerImage.png';
import feedImage from '../assets/feedImage.png';
import medicineImage from '../assets/medicineImage.png';
import milkImage from '../assets/milkImage.png';
import teamImage from '../assets/teamImage.png';

// Placeholder for image paths
const About = () => {
    return (
        <AuthLayout>
            <Container maxWidth="lg" className='mt-4'>
                {/* Header Section */}
                <Card elevation={3} sx={{ py: 5, textAlign: 'center', marginBottom: 4 }} className='bg-gray-50 dark:bg-gray-900'>
                    <Typography variant="h2" gutterBottom sx={{ color: '#7e57c2', fontWeight: 'bold' }}>
                        About Us
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#6F3694' }}>
                        Welcome to DairyFresh – Providing Fresh Milk & Quality Animal Feed, Medicines for a Better Tomorrow
                    </Typography>
                </Card>

                {/* Our Mission Section */}
                <Grid container spacing={4} alignItems="center" sx={{ mb: 4 }}>
                    <Grid item xs={12} md={6}>
                        <Box component="img" src={farmerImage} alt="Farmer" sx={{ width: '100%', height: '300px', borderRadius: '10px' }} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" sx={{ color: '#6F3694', mb: 2, fontWeight: 'bold' }}>
                            Our Mission
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            At DairyFresh, we strive to ensure that our customers receive the highest quality milk directly from local farmers. We
                            also provide superior animal feed and medicines, helping farmers raise healthy livestock and improving their milk
                            yield. We work closely with farmers to guarantee that our milk is fresh, pure, and packed with nutrients.
                        </Typography>
                    </Grid>
                </Grid>

                {/* Our Services Section */}
                <Typography variant="h4" sx={{ color: '#6F3694', mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
                    Our Services
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {/* Service 1: Milk Collection */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ textAlign: 'center', borderRadius: '10px', boxShadow: 3, height: '100%', display: 'flex', flexDirection: 'column' }} className='bg-gray-50 dark:bg-gray-900'>
                            <CardMedia
                                component="img"
                                image={milkImage}
                                alt="Milk Collection"
                                sx={{ height: '150px', objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
                            />
                            <CardContent sx={{ flex: '1' }}>
                                <MilkIcon fontSize="large" sx={{ color: '#7e57c2' }} />
                                <Typography variant="h6" sx={{ color: '#6F3694', mt: 2 }}>
                                    Milk Collection
                                </Typography>
                                <Typography variant="body2">
                                    We collect fresh milk directly from local farmers, ensuring top quality and freshness with every collection.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Service 2: Feed Sales */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ textAlign: 'center', borderRadius: '10px', boxShadow: 3, height: '100%', display: 'flex', flexDirection: 'column' }} className='bg-gray-50 dark:bg-gray-900'>
                            <CardMedia
                                component="img"
                                image={feedImage}
                                alt="Feed Sales"
                                sx={{ height: '150px', objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
                            />
                            <CardContent sx={{ flex: '1' }}>
                                <GrassIcon fontSize="large" sx={{ color: '#7e57c2' }} />
                                <Typography variant="h6" sx={{ color: '#6F3694', mt: 2 }}>
                                    Feed Sales
                                </Typography>
                                <Typography variant="body2">
                                    We offer a wide range of animal feed products to help keep livestock healthy and productive all year round.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Service 3: Medicine Sales */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ textAlign: 'center', borderRadius: '10px', boxShadow: 3, height: '100%', display: 'flex', flexDirection: 'column' }} className='bg-gray-50 dark:bg-gray-900'>
                            <CardMedia
                                component="img"
                                image={medicineImage}
                                alt="Medicine Sales"
                                sx={{ height: '150px', objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
                            />
                            <CardContent sx={{ flex: '1' }}>
                                <MedicationIcon fontSize="large" sx={{ color: '#7e57c2' }} />
                                <Typography variant="h6" sx={{ color: '#6F3694', mt: 2 }}>
                                    Medicine Sales
                                </Typography>
                                <Typography variant="body2">
                                    We provide veterinary medicines and supplements that ensure the well-being of animals and the quality of milk
                                    production.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Service 4: Reliable Delivery */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ textAlign: 'center', borderRadius: '10px', boxShadow: 3, height: '100%', display: 'flex', flexDirection: 'column' }} className='bg-gray-50 dark:bg-gray-900'>
                            <CardMedia
                                component="img"
                                image={teamImage}
                                alt="Delivery Service"
                                sx={{ height: '150px', objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
                            />
                            <CardContent sx={{ flex: '1' }}>
                                <LocalShippingIcon fontSize="large" sx={{ color: '#7e57c2' }} />
                                <Typography variant="h6" sx={{ color: '#6F3694', mt: 2 }}>
                                    Collection Only
                                </Typography>
                                <Typography variant="body2">
                                    We offer a collection-only service for our products, ensuring convenience and reliability for our customers.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Our Commitment Section */}
                <Grid elevation={3} sx={{ py: 5, textAlign: 'center', my: 4 }}>
                    <Typography variant="h4" sx={{ color: '#7e57c2', fontWeight: 'bold' }}>
                        Our Commitment
                    </Typography>
                    <Typography variant="body1" sx={{ maxWidth: '800px', mx: 'auto', mt: 2 }}>
                        DairyFresh is committed to sustainability, quality, and supporting local farmers. We work with small and large farms,
                        promoting ethical practices and ensuring that every drop of milk we deliver is healthy, nutritious, and eco-friendly.
                        Our team works round the clock to make sure you get the best dairy products and animal care solutions.
                    </Typography>
                </Grid>

                {/* Meet Our Team Section */}
                <Typography variant="h4" sx={{ color: '#6F3694', mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
                    Meet Our Team
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {['John Doe', 'Jane Smith', 'Michael Brown'].map((name, index) => (
                        <Grid item xs={12} sm={4} key={index}>
                            <Card sx={{ textAlign: 'center', borderRadius: '10px', boxShadow: 3 }} className='bg-gray-50 dark:bg-gray-900'>
                                <Avatar sx={{ width: 100, height: 100, mx: 'auto', mt: 3 }} />
                                <CardContent>
                                    <Typography variant="h6" sx={{ color: '#6F3694', mt: 2 }}>
                                        {name}
                                    </Typography>
                                    <Typography variant="body2">
                                        {name} is an experienced team member committed to ensuring the highest quality of milk and livestock care.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Contact Section */}
                <Box sx={{ py: 5, textAlign: 'center', mt: 4 }}>
                    <Box sx={{ py: 5, textAlign: 'center', mt: 4 }}>
                        <Typography variant="h4" sx={{ color: '#7e57c2', fontWeight: 'bold' }}>
                            Get in Touch
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#6F3694', mb: 2 }}>
                            We're here to help you with any questions or inquiries you may have. Contact us via phone or email.
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<CallIcon />}
                                component="a"
                                href="tel:+1234567890"
                            >
                                +123 456 7890
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<EmailIcon />}
                                component="a"
                                href="mailto:contact@dairyfresh.com"
                            >
                                contact@dairyfresh.com
                            </Button>
                        </Box>
                    </Box>

                </Box>
            </Container>
        </AuthLayout>
    );
};

export default About;
