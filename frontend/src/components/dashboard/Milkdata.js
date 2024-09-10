// Orders.js

import { Card, CardContent, Typography } from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import React from 'react';

const Orders = ({ milkData, milkColumns }) => {
    return (
        <Card sx={{ mb: 4 }} className="bg-gray-100 dark:bg-gray-800">
            <CardContent>
                <Typography variant="h6">Milk History</Typography>
                <DataGrid
                    rows={milkData}
                    columns={milkColumns}
                    autoHeight
                    initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                    pageSizeOptions={[5, 10, 20]}
                    disableRowSelectionOnClick
                />
            </CardContent>
        </Card>
    );
};

export default Orders;
