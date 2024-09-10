import { Box, Button, CircularProgress, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { resetPassword, verifyToken } from '../api/auth'; // Assuming you have a verifyToken function
import { useLocation, useNavigate } from 'react-router-dom';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useSnackbar } from '../hooks/useSnackbar';

const ResetPassword = () => {
  const { search } = useLocation();
  const token = new URLSearchParams(search).get('token'); // Get token from URL
  const showSnackbar = useSnackbar();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { newPassword: '', confirmPassword: '' }
  });

  const [verificationStatus, setVerificationStatus] = React.useState('loading'); // 'loading', 'valid', 'invalid'
  const [showPassword, setShowPassword] = React.useState(false);

  React.useEffect(() => {
    const verifyResetToken = async () => {
      try {
        const isValid = await verifyToken(token); // Verify token with your API
        if (isValid) {
          setVerificationStatus('valid');
        } else {
          setVerificationStatus('invalid');
        }
      } catch (err) {
        setVerificationStatus('invalid');
        console.error('Token verification failed:', err);
      }
    };

    verifyResetToken();
  }, [token]);

  const onSubmit = async (data) => {
    try {
      if (data.newPassword !== data.confirmPassword) {
        showSnackbar({ message: 'Passwords do not match.', severity: 'error' });
        return;
      }
      await resetPassword(token, data.newPassword);
      showSnackbar({ message: 'Password has been reset successfully!', severity: 'info' });
      navigate('/'); // Redirect to login page
    } catch (err) {
      showSnackbar({ message: 'Error resetting password.', severity: 'error' });
      console.error('Password reset failed:', err);
    }
  };

  const handleClickShowPassword = () => setShowPassword(prev => !prev);

  if (verificationStatus === 'loading') {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  }

  if (verificationStatus === 'invalid') {
    return (
      <Typography variant="h6" color="error" align="center">
        The reset token is invalid or has expired. Please request a new password reset.
      </Typography>
    );
  }

  return (
    <Box padding={3} maxWidth={600} margin="0 auto">
      <Typography variant="h4" color="textPrimary" gutterBottom align="center">
        Reset Password
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="New Password" type={showPassword ? 'text' : 'password'} fullWidth variant="outlined" size="small"
              {...register('newPassword', { required: 'New password is required' })}
              error={!!errors.newPassword} helperText={errors.newPassword?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Confirm Password" type={showPassword ? 'text' : 'password'} fullWidth variant="outlined" size="small"
              {...register('confirmPassword', { required: 'Confirm password is required' })}
              error={!!errors.confirmPassword} helperText={errors.confirmPassword?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>Reset Password</Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ResetPassword;
