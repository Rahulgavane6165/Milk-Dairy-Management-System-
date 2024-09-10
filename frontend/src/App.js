import { AuthProvider, useAuth } from './context/AuthContext';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import About from './pages/About';
import CollectionPage from './pages/Collection';
import ContactUs from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFoundPage from './pages/404';
import PrivateRoute from './utils/PrivateRoutes';
import Product from './pages/Product';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import { SnackbarProvider } from './hooks/useSnackbar';
import { useCustomTheme } from './theme';

const RedirectIfAuthenticated = ({ children, redirectTo }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to={redirectTo} /> : children;
};

const App = () => {
  const muiTheme = useCustomTheme();
  const isAuthenticated = false; // Replace with actual authentication logic

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <SnackbarProvider>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/signin" element={<RedirectIfAuthenticated redirectTo="/dashboard"><Login /></RedirectIfAuthenticated>} />
              <Route path="/signup" element={<RedirectIfAuthenticated redirectTo="/dashboard"><Register /></RedirectIfAuthenticated>} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/product" element={<Product />} />
                <Route path="/collection" element={<CollectionPage />} />
              </Route>
              <Route path="/" element={<RedirectIfAuthenticated redirectTo="/dashboard"><Login /></RedirectIfAuthenticated>} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AuthProvider>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
