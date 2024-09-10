import * as yup from 'yup';

import { Button, Grid, InputAdornment, Link, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { login, requestReset } from '../api/auth';

import AuthLayout from '../layouts/AuthLayout';
import EmailIcon from '@mui/icons-material/Email';
import LoadingPage from '../components/Loader';
import LockIcon from '@mui/icons-material/Lock';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../hooks/useSnackbar';
import { yupResolver } from '@hookform/resolvers/yup';

// Function to get the validation schema based on form mode
const getValidationSchema = (forgotPassword) => {
  return yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    ...(forgotPassword ? {} : {
      password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
    })
  }).required();
};

const Login = () => {
  const showSnackbar = useSnackbar();
  const { loginToken } = useAuth();
  const navigate = useNavigate();
  const [forgotPassword, setForgotPassword] = useState(false);
  const { control, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: yupResolver(getValidationSchema(forgotPassword)),
    defaultValues: { email: '', password: '' }
  });

  useEffect(() => {
    reset();
  }, [forgotPassword, reset]);

  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      const { token } = response; // Extract token from response
      loginToken({ token });
      navigate('/dashboard');
      showSnackbar({ message: 'Login successful!', severity: 'info' });
    } catch (err) {
      showSnackbar({ message: err.response?.data?.message, severity: 'error' });
      console.error('Login failed:', err);
    }
  };

  const handleResetRequest = async (email) => {
    try {
      await requestReset(email);
      showSnackbar({ message: 'Password reset link sent to your email.', severity: 'info' });
      setForgotPassword(false); // Hide the forgot password form
      reset(); // Clear the email field
    } catch (err) {
      showSnackbar({ message: 'Error sending reset link.', severity: 'error' });
      console.error('Reset request failed:', err);
    }
  };

  return (
    <AuthLayout>
      <Grid container spacing={2} md={4} display={'flex'} justifyContent='center'>
        {isSubmitting && <LoadingPage />} {/* Show loader when submitting */}
        <Typography variant="h5" color="textPrimary" gutterBottom align="center">
          {forgotPassword ? 'Reset Password Now' : 'Sign In'}
        </Typography>
        <form onSubmit={handleSubmit(forgotPassword ? (data) => handleResetRequest(data.email) : onSubmit)} noValidate>
          <Grid container spacing={4}>
            {forgotPassword ? (
              <>
                <Grid item xs={12}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label="Email" type="email" fullWidth variant="outlined" size="small"
                        error={!!errors.email} helperText={errors.email?.message}
                        InputProps={{ startAdornment: (<InputAdornment position="start"><EmailIcon /></InputAdornment>) }}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>Send Reset Link</Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="textSecondary">
                    <Link href="#" onClick={() => setForgotPassword(false)} variant="body2" color="primary" underline="hover">
                      Back to Sign In
                    </Link>
                  </Typography>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label="Email" type="email" fullWidth variant="outlined" size="small"
                        error={!!errors.email} helperText={errors.email?.message}
                        InputProps={{ startAdornment: (<InputAdornment position="start"><EmailIcon /></InputAdornment>) }}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label="Password" type="password" fullWidth variant="outlined" size="small"
                        error={!!errors.password} helperText={errors.password?.message}
                        InputProps={{ startAdornment: (<InputAdornment position="start"><LockIcon /></InputAdornment>) }}
                        {...field}
                      />
                    )}
                  />
                  <Typography variant="body2" color="textSecondary" mt={2}>
                    Forgot your password?{' '}
                    <Link href="#" onClick={() => setForgotPassword(true)} variant="body2" color="primary" underline="hover">
                      Reset Password
                    </Link>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>Sign In</Button>
                </Grid>
                <Grid container justifyContent="center" mt={2}>
                  <Typography variant="body2" color="textSecondary">
                    Don't have an account?{' '}
                    <Link href="/signup" variant="body2" color="primary" underline="hover">
                      Register
                    </Link>
                  </Typography>
                </Grid>
              </>
            )}
          </Grid>
        </form>
      </Grid>
    </AuthLayout>
  );
};

export default Login;
