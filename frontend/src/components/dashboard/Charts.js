import { Box, Card, CardContent, Grid, useTheme } from '@mui/material';
import { CategoryScale, Chart as ChartJS, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js';

import { Line } from 'react-chartjs-2';
import React from 'react';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MilkChart = ({ milkData }) => {
    const theme = useTheme();  // Access MUI's theme (light/dark)

    // Extract unique milk types
    const milkTypes = [...new Set(milkData.map(item => item.milk_type))];

    // Define a color palette
    const colorPalette = [
        '#1976D2', '#9C27B0', '#4CAF50', '#FFC107', '#FF5722',
        '#3F51B5', '#E91E63', '#00BCD4', '#009688', '#FF9800'];


    // Function to generate chart datasets for quantity
    const generateQuantityDataset = (data, label, color) => ({
        label: `${label} (Liters)`,
        data: data.map(item => item.quantity),
        borderColor: color,
        backgroundColor: color + '33',  // Lighter background color for filling
        fill: true,
        tension: 0.3,
    });

    // Function to generate chart datasets for fat percentage
    const generateFatDataset = (data, label, color) => ({
        label: `${label} Fat (%)`,
        data: data.map(item => item.fat),
        borderColor: color,
        backgroundColor: color + '33',
        fill: true,
        tension: 0.3,
    });

    // Group data by milk type
    const groupedData = milkTypes.reduce((acc, type) => {
        acc[type] = milkData.filter(item => item.milk_type === type);
        return acc;
    }, {});

    // Chart options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: theme.palette.text.primary,
                },
            },
            title: {
                display: true,
                color: theme.palette.text.primary,
            },
            tooltip: {
                titleColor: theme.palette.text.primary,
                bodyColor: theme.palette.text.primary,
            },
        },
        scales: {
            x: {
                ticks: {
                    color: theme.palette.text.primary,
                },
                grid: {
                    color: theme.palette.divider,
                },
            },
            y: {
                ticks: {
                    color: theme.palette.text.primary,
                },
                grid: {
                    color: theme.palette.divider,
                },
            },
        },
    };

    // Chart Data for Quantity (Chart 1)
    const quantityData = {
        labels: milkData.map(item => new Date(item.date).toLocaleDateString()),  // X-axis: dates
        datasets: milkTypes.map((type, index) => generateQuantityDataset(groupedData[type], `${type} Milk Quantity`, colorPalette[index % colorPalette.length])),
    };

    // Chart Data for Fat Percentage (Chart 2)
    const fatData = {
        labels: milkData.map(item => new Date(item.date).toLocaleDateString()),
        datasets: milkTypes.map((type, index) => generateFatDataset(groupedData[type], `${type} Milk`, colorPalette[index % colorPalette.length])),
    };

    return (
        <Grid container className="bg-gray-100 dark:bg-gray-800">
            <Grid item xs={12} md={6} className='p-2'>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} className="bg-gray-100 dark:bg-gray-800">
                    <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                        <Box sx={{ height: 300, flex: 1 }}>
                            <Line data={quantityData} options={{ ...options, plugins: { ...options.plugins, title: { ...options.plugins.title, text: 'Milk Quantity Over Time' } } }} />
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6} className='p-2'>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} className="bg-gray-100 dark:bg-gray-800">
                    <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                        <Box sx={{ height: 300, flex: 1 }}>
                            <Line data={fatData} options={{ ...options, plugins: { ...options.plugins, title: { ...options.plugins.title, text: 'Milk Fat Percentage Over Time' } } }} />
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default MilkChart;
