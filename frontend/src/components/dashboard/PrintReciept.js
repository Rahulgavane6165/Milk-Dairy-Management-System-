import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

import { Print as PrintIcon } from '@mui/icons-material';
import ReactToPrint from 'react-to-print';
import { jwtDecode } from 'jwt-decode';

const PrintReceipt = ({ orderDetails }) => {
    const [userDetails, setUserDetails] = useState({});
    const componentRef = useRef();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserDetails({
                    name: decoded.name,
                    email: decoded.email
                });
            } catch (error) {
                console.error('Invalid token:', error);
            }
        } else {
            console.error('No authentication token found');
        }
    }, []);

    // Calculate totals
    const quantitySold = orderDetails?.quantity_sold || 1; // Default to 1 if not provided
    const unitPrice = orderDetails?.sale_price;
    const totalAmount = (unitPrice * quantitySold).toFixed(2);
    const discountAmount = (totalAmount * (orderDetails?.product_discount / 100)).toFixed(2);
    const amountAfterDiscount = (totalAmount - discountAmount).toFixed(2);
    const sgst = (amountAfterDiscount * 0.09).toFixed(2); // Assuming SGST is 9%
    const cgst = (amountAfterDiscount * 0.09).toFixed(2); // Assuming CGST is 9%
    const finalAmount = (parseFloat(amountAfterDiscount)).toFixed(2);

    return (
        <div style={{ position: 'relative' }}>
            <Box mt={2} textAlign="end">
                <ReactToPrint
                    trigger={() => (
                        <Button variant="contained" color="primary" startIcon={<PrintIcon />}>
                            Print Receipt
                        </Button>
                    )}
                    content={() => componentRef.current}
                />
            </Box>
            <div ref={componentRef} style={{ width: '100mm', margin: '0 auto', fontFamily: 'Arial, sans-serif' }} className='border border-gray-500 p-4 px-6'>

                <Typography variant="h6" align="center" color="primary" gutterBottom>
                    RECEIPT
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <Typography variant="subtitle1">
                        Date: {orderDetails?.sale_date}
                    </Typography>
                    <Typography variant="h6">
                        {orderDetails?.product_name}
                    </Typography>
                </Stack>
                <Divider sx={{ my: 1 }} />

                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <Typography variant="body1" color="textSecondary">
                        Customer Name: {userDetails.name || 'N/A'}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Email: {userDetails.email || 'N/A'}
                    </Typography>
                </Stack>
                <Divider sx={{ my: 2 }} />

                <Stack spacing={1}>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="body1">Quantity Sold</Typography>
                        <Typography variant="body1">{quantitySold}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="body1">Unit Price</Typography>
                        <Typography variant="body1">₹{unitPrice}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="body1">Total Amount</Typography>
                        <Typography variant="body1">₹{totalAmount}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="body1">Discount ({orderDetails?.product_discount}%)</Typography>
                        <Typography variant="body1">- ₹{discountAmount}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="body1">SGST (9%)</Typography>
                        <Typography variant="body1">₹{sgst}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="body1">CGST (9%)</Typography>
                        <Typography variant="body1">₹{cgst}</Typography>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="body1" fontWeight="bold">Final Amount</Typography>
                        <Typography variant="body1" fontWeight="bold">₹{finalAmount}</Typography>
                    </Box>
                </Stack>
                <Divider sx={{ my: 2 }} />

                <Typography variant="body2" align="center" color="textSecondary">
                    Thank you for your purchase!
                </Typography>
            </div>


        </div>
    );
};

export default PrintReceipt;
