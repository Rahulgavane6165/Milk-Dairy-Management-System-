// src/pages/Register.jsx

import * as yup from 'yup';

import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import AuthLayout from '../layouts/AuthLayout';
import LoadingPage from '../components//Loader';
import React from 'react';
import { register } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../hooks/useSnackbar';
import { yupResolver } from '@hookform/resolvers/yup';

// Validation schema using Yup
const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  bank_account_number: yup.string().required('Bank account is required'),
  ifsc_code: yup.string().required('IFSC code is required'),
  adhar_number: yup.string().required('Aadhaar number is required'),
  address: yup.string().required('Address is required'),
}).required();

const Register = () => {
  const showSnackbar = useSnackbar();
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      bank_account_number: '',
      ifsc_code: '',
      adhar_number: '',
      address: ''
    }
  });

  const onSubmit = async (data) => {
    try {
      const response = await register(data);
      showSnackbar({ message: "Registred successfull", severity: 'info' });
      console.log('Registration successful:', response);
      navigate('/');
      // Handle successful registration (e.g., redirect to dashboard)
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An error occurred';
      showSnackbar({ message: errorMessage, severity: 'error' });
      console.error('Registration failed:', err);
    }
  };

  return (
    <AuthLayout>
      <Grid container spacing={2} md={4} display={'flex'} justifyContent='center'>

        {isSubmitting && <LoadingPage />} {/* Show loader when submitting */}
        <Typography variant="h5" color="textPrimary" gutterBottom align="center">Sign Up</Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Controller name="name" control={control} render={({ field }) => (
                <TextField label="Name" fullWidth variant="outlined" size="small" error={!!errors.name} helperText={errors.name?.message} {...field} />
              )} />
            </Grid>
            <Grid item xs={12}>
              <Controller name="email" control={control} render={({ field }) => (
                <TextField label="Email" type="email" fullWidth variant="outlined" size="small" error={!!errors.email} helperText={errors.email?.message} {...field} />
              )} />
            </Grid>
            <Grid item xs={12}>
              <Controller name="password" control={control} render={({ field }) => (
                <TextField label="Password" type="password" fullWidth variant="outlined" size="small" error={!!errors.password} helperText={errors.password?.message} {...field} />
              )} />
            </Grid>
            <Grid item xs={12}>
              <Controller name="bank_account_number" control={control} render={({ field }) => (
                <TextField label="Bank Account" fullWidth variant="outlined" size="small" error={!!errors.bank_account_number} helperText={errors.bank_account_number?.message} {...field} />
              )} />
            </Grid>
            <Grid item xs={12}>
              <Controller name="ifsc_code" control={control} render={({ field }) => (
                <TextField label="IFSC Code" fullWidth variant="outlined" size="small" error={!!errors.ifsc_code} helperText={errors.ifsc_code?.message} {...field} />
              )} />
            </Grid>
            <Grid item xs={12}>
              <Controller name="adhar_number" control={control} render={({ field }) => (
                <TextField label="Aadhaar Number" fullWidth variant="outlined" size="small" error={!!errors.adhar_number} helperText={errors.adhar_number?.message} {...field} />
              )} />
            </Grid>
            <Grid item xs={12}>
              <Controller name="address" control={control} render={({ field }) => (
                <TextField label="Address" fullWidth variant="outlined" size="small" error={!!errors.address} helperText={errors.address?.message} {...field} />
              )} />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>Sign Up</Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" mt={2}>
            <Typography variant="body2" color="textSecondary">
              Already have an account?{' '}
              <Link href="/" variant="body2" color="primary" underline="hover">
                Login
              </Link>
            </Typography>
          </Grid>
        </form>
      </Grid>
    </AuthLayout>
  );
};

export default Register;
