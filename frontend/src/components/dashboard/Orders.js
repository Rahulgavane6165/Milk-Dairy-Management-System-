import { Avatar, Button, Card, CardContent, Link, Typography } from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import PrintReceipt from './PrintReciept';
import React from 'react';
import { currentViewState } from '../../recoil/dashboardAtom';
import { useRecoilState } from 'recoil';

const Orders = ({ orderHistory }) => {
  const [currentView, setCurrentView] = useRecoilState(currentViewState);
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const orderColumns = [
    {
      field: 'product_image_path',
      headerName: 'Image',
      flex: 0.5,
      renderCell: (params) => (
        <Avatar src={params.value} variant="rounded" sx={{ width: 50, height: 50 }} />
      ),
    },
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'product_name', headerName: 'Name', flex: 1 },
    { field: 'quantity_sold', headerName: 'Quantity Sold', flex: 1 },
    { field: 'product_category', headerName: 'Category', flex: 1 },
    { field: 'sale_price', headerName: 'Price', flex: 1 },
    { field: 'product_discount', headerName: 'Discount', flex: 1 },
    { field: 'sale_date', headerName: 'Sale Date', flex: 1 },
    {
      field: 'print_receipt', headerName: '', flex: 1, renderCell: (params) => (
        <Link component="a" color="primary" onClick={() => handlePrintReceiptClick(params.row)} sx={{ cursor: 'pointer' }} >  Print Receipt </Link>
      ),
    }
  ];

  const handlePrintReceiptClick = (orderDetails) => {
    setCurrentView('printReceipt');
    setSelectedOrder(orderDetails);
  }

  return (
    <Card sx={{ mb: 4 }} className="bg-gray-100 dark:bg-gray-800">
      <CardContent>
        {(currentView === 'home' || currentView === 'orderHistory') && (
          <>
            <Typography variant="h6">Order History</Typography>
            <DataGrid
              rows={orderHistory}
              columns={orderColumns}
              autoHeight
              initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
              pageSizeOptions={[5, 10, 20]}
              disableRowSelectionOnClick
            />
          </>
        )}
        {(currentView === 'printReceipt') && (
          <PrintReceipt orderDetails={selectedOrder} />
        )}
      </CardContent>
    </Card>
  );
};

export default Orders;
