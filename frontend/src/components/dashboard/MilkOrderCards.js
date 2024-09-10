import { Avatar, Box, Card, CardContent, Chip, Divider, FormControl, Grid, MenuItem, Select, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';

import MilkChart from './Charts'

const MilkOrderCards = ({ orderHistory, milkData }) => {
    const theme = useTheme();
    const [orderFilter, setOrderFilter] = useState({ month: new Date().getMonth(), year: new Date().getFullYear() });
    const [milkFilter, setMilkFilter] = useState({ month: new Date().getMonth(), year: new Date().getFullYear() });

    const recentOrders = orderHistory.filter((order) => {
        const orderDate = new Date(order.sale_date);
        return orderDate.getMonth() === orderFilter.month && orderDate.getFullYear() === orderFilter.year;
    });

    const filteredMilkData = milkData.filter((data) => {
        const date = new Date(data.date);
        return date.getMonth() === milkFilter.month && date.getFullYear() === milkFilter.year;
    });

    return (
        <Grid container spacing={2} >
            {/* Card for Recent Orders */}
            <Grid item xs={12} md={12}><MilkChart milkData={filteredMilkData}/></Grid>
            <Grid item xs={12} md={6}>                
                <Card className="bg-gray-50 dark:bg-gray-900">
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6">Recent Orders</Typography>
                            {/* Order Filter */}
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
                                    <Select
                                        value={orderFilter.month}
                                        onChange={(e) => setOrderFilter((prev) => ({ ...prev, month: e.target.value }))}
                                        size="small"
                                    >
                                        {Array.from({ length: 12 }).map((_, i) => (
                                            <MenuItem key={i} value={i}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 60 }}>
                                    <Select
                                        value={orderFilter.year}
                                        onChange={(e) => setOrderFilter((prev) => ({ ...prev, year: e.target.value }))}
                                        size="small"
                                    >
                                        {[2023, 2024, 2025].map((year) => (
                                            <MenuItem key={year} value={year}>{year}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <Box sx={{ maxHeight: 250, overflowY: 'auto' }}>
                            {recentOrders.length === 0 ? (
                                <Typography variant="body2">No orders found for selected month/year</Typography>
                            ) : (
                                recentOrders.map((order) => (
                                    <Box key={order.id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Avatar src={order.product_image_path} sx={{ width: 50, height: 50, mr: 2 }} />
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography variant="body2">
                                                {order.product_name} - {order.quantity_sold} units
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Category: {order.product_category}
                                            </Typography>
                                        </Box>
                                        <Chip label={`Discount: ${order.product_discount}%`} color="primary" size="small" sx={{ ml: 2 }} />
                                    </Box>
                                ))
                            )}
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

            {/* Card for Milk Data */}
            <Grid item xs={12} md={6}>
                <Card className="bg-gray-50 dark:bg-gray-900">
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6">  Month Milk Data</Typography>
                            {/* Milk Filter */}
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
                                    <Select value={milkFilter.month} onChange={(e) => setMilkFilter((prev) => ({ ...prev, month: e.target.value }))} size="small" >
                                        {Array.from({ length: 12 }).map((_, i) => (
                                            <MenuItem key={i} value={i}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 60 }}>
                                    <Select value={milkFilter.year} onChange={(e) => setMilkFilter((prev) => ({ ...prev, year: e.target.value }))} size="small" >
                                        {[2023, 2024, 2025].map((year) => (
                                            <MenuItem key={year} value={year}>{year}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <Box sx={{ maxHeight: 250, overflowY: 'auto' }}>
                            {filteredMilkData.length === 0 ? (
                                <Typography variant="body2">No milk data for selected month/year</Typography>
                            ) : (
                                filteredMilkData.map((milk) => (
                                    <Box key={milk.id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography variant="body2">
                                                {milk.milk_type} - {milk.quantity} liters - {milk.fat} fat
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Date: {milk.date}
                                            </Typography>
                                        </Box>
                                        <Chip label={`Amount: ₹ ${milk.amount}`} color="primary" size="small" sx={{ ml: 2 }} />
                                    </Box>
                                ))
                            )}
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>

    )
}

export default MilkOrderCards