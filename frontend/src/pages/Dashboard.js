import { Box, Breadcrumbs, Link } from '@mui/material';
import React, { useEffect, useState } from 'react';

import DashboardLayout from '../layouts/Dashboard';
import MilkOrderCards from '../components/dashboard/MilkOrderCards'
import Milkdata from '../components/dashboard/Milkdata'
import Order from '../components/dashboard/Orders'
import Profile from '../components/dashboard/Profile'
import { currentViewState } from '../recoil/dashboardAtom';
import { getCollectionsByUserId } from '../api/collection';
import { getSalesByUserId } from '../api/sales';
import { getUserDetails } from '../api/user'; // Fetch & update user details
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/AuthContext';
import { useRecoilState } from 'recoil';
import { useSnackbar } from '../hooks/useSnackbar';

const Dashboard = () => {
  const showSnackbar = useSnackbar();
  const { logout } = useAuth();
  const [milkData, setMilkData] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    address: '',
    adhar_number: '',
    bank_account_number: '',
    ifsc_code: '',
    userType: '',
  });
  const [currentView, setCurrentView] = useRecoilState(currentViewState);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        showSnackbar({ message: 'No authentication token found', severity: 'error' });
        return;
      }
      const getUserIdFromToken = (token) => {
        try {
          const decoded = jwtDecode(token);
          return decoded.id;
        } catch (e) {
          console.error('Invalid token', e);
          return null;
        }
      }
      const userId = getUserIdFromToken(token);

      try {
        const milkResponse = await getCollectionsByUserId(userId);
        setMilkData(milkResponse);
        const orderResponse = await getSalesByUserId(userId);
        setOrderHistory(orderResponse.formattedSalesData);

        // Fetch user profile details
        const userDetails = await getUserDetails(userId);
        setProfileData(userDetails);
      } catch (err) {
        showSnackbar({ message: err.message, severity: 'error' });
      }
    };

    fetchData();
  }, []);

  const handleBreadcrumbClick = (view) => {
    setCurrentView(view);
  };

  const handleLogout = () => {
    logout();
  };


  const getBreadcrumbs = () => {
    let breadcrumbs = [{ label: 'Dashboard', view: 'home' }];
    if (currentView === 'profile') {
      breadcrumbs.push({ label: 'Profile', view: 'profile' });
    } else if (currentView === 'overview') {
      breadcrumbs.push({ label: 'Overview', view: 'overview' });
    } else if (currentView === 'milkData') {
      breadcrumbs.push({ label: 'Milk Data', view: 'milkData' });
    } else if (currentView === 'orderHistory' || currentView === 'printReceipt') {
      breadcrumbs.push({ label: 'Order History', view: 'orderHistory' });
      if (currentView === 'printReceipt') {
        breadcrumbs.push({ label: 'Print Receipt', view: 'printReceipt' });
      }

    }
    return breadcrumbs;
  };
  const milkColumns = [
    { field: 'id', headerName: 'ID', flex: 2 },
    { field: 'milk_type', headerName: 'Milk Type', flex: 1 },
    { field: 'quantity', headerName: 'Quantity', flex: 1 },
    { field: 'fat', headerName: 'Fat  ', flex: 1 },
    { field: 'amount', headerName: 'Amount', flex: 1 },
    { field: 'date', headerName: 'Date', flex: 1 },
  ];


  

  return (
    <DashboardLayout profileData={profileData} handleLogout={handleLogout}>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 2 }}>
          {getBreadcrumbs().map((breadcrumb, index) => (
            <Link
              key={index}
              color={breadcrumb.view === currentView ? 'text.primary' : 'inherit'}
              onClick={() => handleBreadcrumbClick(breadcrumb.view)}
              sx={{ cursor: 'pointer' }}
            >
              {breadcrumb.label}
            </Link>
          ))}
        </Breadcrumbs>
        {(currentView === 'home' || currentView === 'profile') && <Profile profileData={profileData} setProfileData={setProfileData} showSnackbar={showSnackbar} />}
        {(currentView === 'home' || currentView === 'overview') && <MilkOrderCards orderHistory={orderHistory} milkData={milkData} />}
        {(currentView === 'home' || currentView === 'milkData') && <Milkdata milkData={milkData} milkColumns={milkColumns} />}
        {(currentView === 'home' || currentView === 'orderHistory' || currentView === 'printReceipt') && <Order orderHistory={orderHistory} />}

      </Box>
    </DashboardLayout>
  );
};

export default Dashboard;

