import { Box, Button, CardMedia, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import React, { useCallback, useEffect, useState } from 'react';
import { createCollection, deleteCollection, getCollectionsByDate } from '../api/collection';

import { DataGrid } from '@mui/x-data-grid';
import LoadingPage from '../components/Loader';
import { getAllUsers } from '../api/user';
import { getMilkPriceByFat } from '../api/milkprice';
import { useSnackbar } from '../hooks/useSnackbar';

const milkTypes = ['cow', 'buffalo', 'sheep', 'cattle', 'other'];

const CollectionPage = () => {
    const showSnackbar = useSnackbar();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [milkPrice, setMilkPrice] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);
    const [collection, setCollection] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const { control, handleSubmit, watch, formState: { errors } } = useForm();

    const fat = watch('fat');
    const milk_type = watch('milk_type');
    const quantity = watch('quantity');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllUsers();
                setUsers(response);
            } catch (err) {
                showSnackbar({ message: err.response?.data?.message, severity: 'error' });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        fetchCollection();
    }, []);

    const fetchMilkPrice = useCallback(async () => {
        if (fat) {
            try {
                const priceData = await getMilkPriceByFat(fat, milk_type);
                setMilkPrice(priceData.price);
            } catch (err) {
                setMilkPrice(null);
                showSnackbar({
                    message: err.response?.data?.message || 'Failed to fetch milk price',
                    severity: 'error',
                });
            }
        }
    }, [fat, showSnackbar, milk_type]);

    const calculateTotalAmount = useCallback(() => {
        if (milkPrice && quantity) {
            const amount = quantity * milkPrice;
            setTotalAmount(amount);
        } else {
            setTotalAmount(null);
        }
    }, [milkPrice, quantity]);


    useEffect(() => {
        calculateTotalAmount();
    }, [quantity, milkPrice, milk_type, calculateTotalAmount]);

    useEffect(() => {
        fetchMilkPrice();
    }, [fat, fetchMilkPrice]);

    const onSubmit = async (data) => {
        if (milkPrice) {
            const amount = quantity * milkPrice;
            data.amount = amount;

            try {
                await createCollection({ ...data, amount });
                showSnackbar({ message: "Collection created successfully.", severity: 'success' });
                fetchCollection();
            } catch (err) {
                showSnackbar({ message: err.response?.data?.message, severity: 'error' });
            }
        } else {
            showSnackbar({ message: "Milk price is not available.", severity: 'error' });
        }
    };

    const fetchCollection = async () => {
        const today = new Date().toISOString().split('T')[0];
        const response = await getCollectionsByDate(today);
        setCollection(response);
    }

    const handleDelete = async () => {
        try {
            await Promise.all(selectedRows.map(id => deleteCollection(id)));
            showSnackbar({ message: 'Collection deleted successfully.', severity: 'success' });
            fetchCollection(); // Refresh the collection data
            setSelectedRows([]); // Clear selection
        } catch (err) {
            showSnackbar({ message: 'Error deleting collection.', severity: 'error' });
        }
    };

    const columns = [
        {
            field: 'serialNumber',
            headerName: 'S.No',
            width: 80,
            renderCell: (params) => {
                const index = params.api.getSortedRowIds().indexOf(params.id) + 1; // Correct Serial number
                return (
                    <Typography
                        variant="body2"
                        style={{
                            borderRadius: '50%',
                            backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Random color
                            color: '#fff',
                            textAlign: 'center',
                            lineHeight: '24px',
                            width: '24px',
                            height: '24px',
                        }}
                    >
                        {index}
                    </Typography>
                );
            },
        },
        {
            field: 'user_id', headerName: 'User ID', flex: 1, minWidth: 150, renderCell: (params) => (
                <Typography noWrap style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {params.value}
                </Typography>
            )
        },
        { field: 'milk_type', headerName: 'Milk Type', flex: 1, Width: 120 },
        { field: 'fat', headerName: 'Fat', width: 120 },
        { field: 'quantity', headerName: 'Quantity', width: 120 },
        { field: 'amount', headerName: 'Amount', width: 120 },
        { field: 'date', headerName: 'Date', width: 120 },
    ];

    const totalUsers = collection.length;
    const totalQuantity = parseInt(collection.reduce((sum, item) => sum + (item.quantity || 0), 0));
    const totalAmountFromCollection = parseInt(collection.reduce((sum, item) => sum + (item.amount || 0), 0));


    return (
        <Box p={3} maxWidth="full" mx="auto" className="w-full flex flex-col justify-center items-center">
            {loading && <LoadingPage />}
            <Box maxWidth="100%" minWidth="100%">
                <Grid container spacing={0}>
                    <Grid xs={12} sm={5} className='sm:pr-6'>
                        <CardMedia component="img" image='images/image.png' alt="loading" sx={{ height: 240, objectFit: 'cover', minwidth: '100%', maxWidth: '100%', objectPosition: 'top' }} className="dark:bg-gray-900" />
                    </Grid>
                    <Grid sx={{ width: '60%' }} xs={12} sm={7}>
                        <Typography variant="h6" gutterBottom className='font-bold text-sm pb-4'>Create Collection</Typography>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={4}>
                                {/* User Field */}
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel>User</InputLabel>
                                        <Controller
                                            name="user_id"
                                            control={control}
                                            defaultValue=""
                                            rules={{ required: "User is required" }}
                                            render={({ field }) => (
                                                <Select {...field} label="User" size="small">
                                                    {users.map((user) => (
                                                        <MenuItem key={user.id} value={user.id}>
                                                            {user.name} |
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            )}
                                        />
                                    </FormControl>
                                    {errors.user_id && (
                                        <Typography color="error">{errors.user_id.message}</Typography>
                                    )}
                                </Grid>

                                {/* Milk Type Field */}
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel>Milk Type</InputLabel>
                                        <Controller
                                            name="milk_type"
                                            control={control}
                                            defaultValue=""
                                            rules={{ required: "Milk type is required" }}
                                            render={({ field }) => (
                                                <Select {...field} label="Milk Type" size="small">
                                                    {milkTypes.map((type) => (
                                                        <MenuItem key={type} value={type}>
                                                            {type}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            )}
                                        />
                                    </FormControl>
                                    {errors.milk_type && (
                                        <Typography color="error">{errors.milk_type.message}</Typography>
                                    )}
                                </Grid>

                                {/* Fat Field */}
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name="fat"
                                        control={control}
                                        defaultValue=""
                                        rules={{ required: "Fat is required" }}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Fat"
                                                size="small"
                                                type="number"
                                                variant="outlined"
                                                fullWidth
                                                onBlur={() => fetchMilkPrice()}
                                            />
                                        )}
                                    />
                                    {errors.fat && <Typography color="error">{errors.fat.message}</Typography>}
                                </Grid>

                                {/* Quantity Field */}
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name="quantity"
                                        control={control}
                                        defaultValue=""
                                        rules={{ required: "Quantity is required" }}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Quantity"
                                                size="small"
                                                type="number"
                                                variant="outlined"
                                                fullWidth
                                            />
                                        )}
                                    />
                                    {errors.quantity && (
                                        <Typography color="error">{errors.quantity.message}</Typography>
                                    )}
                                </Grid>

                                {/* Milk Price */}
                                {milkPrice !== null && (
                                    <Grid item xs={12}>
                                        <Typography variant="body1">
                                            Price: ₹{milkPrice} per ltr
                                        </Typography>
                                    </Grid>
                                )}

                                {/* Total Amount */}
                                {totalAmount !== null && (
                                    <Grid item xs={12}>
                                        <Typography variant="body1">
                                            Amount: ₹{totalAmount.toFixed(2)}
                                        </Typography>
                                    </Grid>
                                )}

                                {/* Submit Button */}
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        fullWidth
                                    >
                                        Create Collection
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Box>
            <Divider />
            <Box mt={3} mb={2} width='100%'>
                <Grid container spacing={0}>
                    <Typography variant="body1"><strong>Total Users:</strong> {totalUsers} | </Typography>
                    <Typography variant="body1"><strong>Total Milk Quantity:</strong> {totalQuantity} liters | </Typography>
                    <Typography variant="body1"><strong>Total Amount:</strong>₹{totalAmountFromCollection}</Typography>

                </Grid>
            </Box>

            <Divider />

            <Box mt={2} style={{ height: 400, width: '100%' }}>
                <Box className="flex gap-4">
                    <Typography variant="h5" gutterBottom>
                        Collection Data
                    </Typography>
                    {selectedRows.length > 0 && (
                        <Button variant="outlined" size='small' color="secondary" onClick={handleDelete} className='h-8 hover:bg-purple-700 hover:text-white'>
                            Delete Selected
                        </Button>
                    )}

                </Box>

                <DataGrid
                    rows={collection.map((item) => ({ ...item, id: item.id }))}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                    pagination
                    disableSelectionOnClick
                    checkboxSelection
                    getRowId={(row) => row.id}
                    onRowSelectionModelChange={(newSelectionModel) => { // Update here from onSelectionModelChange
                        console.log("Selected rows:", newSelectionModel);  // Log the selected rows for debugging
                        setSelectedRows(newSelectionModel);
                    }}
                    components={{
                        NoRowsOverlay: () => <Box>No data available</Box>,
                    }}
                />
            </Box>


        </Box>
    );
};

export default CollectionPage;
