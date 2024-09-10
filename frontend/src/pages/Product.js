import { ArrowDownward as ArrowDownwardIcon, ArrowUpward as ArrowUpwardIcon, LocalOffer as LocalOfferIcon } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardMedia, Chip, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Paper, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import LoadingPage from '../components/Loader';
import MainLayout from '../layouts/MainLayout'
import { createSale } from '../api/sales'; // Import the createSale function
import { getAllProducts } from '../api/product';
import { jwtDecode } from 'jwt-decode';
import { useSnackbar } from '../hooks/useSnackbar';

const Product = () => {
  const showSnackbar = useSnackbar();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      const { products } = await getAllProducts();
      setProducts(products);
      showSnackbar({ message: "Products Fetched", severity: 'info' });
    } catch (err) {
      showSnackbar({ message: err.response?.data?.message, severity: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setModalOpen(true);
  };

  const handleQuantityChange = (type) => {
    setQuantity((prevQuantity) => {
      if (type === 'increase') {
        return prevQuantity < selectedProduct.stock_quantity ? prevQuantity + 1 : prevQuantity;
      } else {
        return prevQuantity > 1 ? prevQuantity - 1 : prevQuantity;
      }
    });
  };

  const handleConfirmPurchase = async () => {
    const userId = getUserFromToken();
    if (!userId) { showSnackbar({ message: 'User id not found. please login again', savirity: 'error' }); return; }

    const saleData = { product_id: selectedProduct.id, user_id: userId, quantity_sold: quantity, sale_price: selectedProduct.price, };

    try {
      const response = await createSale(saleData);
      showSnackbar({ message: "Purchase Successful", severity: 'success' });
      console.log("respnse", response)
      setModalOpen(false)
    } catch (err) {
      showSnackbar({ message: err.response?.data?.message, severity: 'error' });
    } finally {
      setModalOpen(false);
    }
  };

  const getUserFromToken = () => {

    const token = localStorage.getItem('authToken');
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.id; // This contains the payload of the token
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  };

  return (
    <MainLayout>
      <Container className='my-4'>
        {loading && <LoadingPage />}
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper', transition: 'transform 0.3s ease', '&:hover': { transform: 'translateY(-5px)' } }} className="dark:bg-gray-800 dark:text-white">
                <Box sx={{ position: 'relative' }}>
                  <CardMedia component="img" image={product.image_path} alt={product.name} sx={{ height: 200, objectFit: 'cover', width: '100%', objectPosition: 'top' }} className="dark:bg-gray-900" />
                  <Chip label={product.category === 'medicine' ? 'Medicine' : 'Feed'} color={product.category === 'medicine' ? 'primary' : 'success'} size="small" sx={{ position: 'absolute', top: 4, right: 4, fontSize: '0.75rem', height: '20px', borderRadius: '8px', padding: '1px 6px' }} />
                </Box>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="h6" component="div">{product.name}</Typography>
                      {product.discount && <Chip label={`${product.discount}% OFF`} color="secondary" size="small" sx={{ ml: 1, fontSize: '0.75rem', height: '23px', borderRadius: '8px', padding: '1px 0px' }} />}
                    </Box>
                    <Typography variant="body2" color="text.secondary" className="dark:text-gray-300">{product.description}</Typography>
                  </Box>
                  <Box mt={2}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="h6" color="primary">₹{parseFloat(product.price).toFixed(2)}</Typography>
                      <Typography variant="body2" color="text.secondary">Stock: {product.stock_quantity}</Typography>
                    </Box>
                    <Button variant="contained" color="primary" fullWidth className="dark:bg-blue-500 dark:hover:bg-blue-700" sx={{ mt: 'auto' }} onClick={() => handleBuyNow(product)}>Buy Now</Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Modal */}
        {selectedProduct && (
          <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="md" fullWidth>
            <DialogTitle>{selectedProduct.name}<IconButton aria-label="close" onClick={() => setModalOpen(false)} sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}><CloseIcon /></IconButton></DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <CardMedia component="img" image={selectedProduct.image_path} alt={selectedProduct.name} sx={{ height: 300, objectFit: 'cover', width: '100%', objectPosition: 'top' }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography gutterBottom variant="h5" sx={{ fontWeight: 'bold' }}>{selectedProduct.name}</Typography>
                  <Typography gutterBottom variant="body1" color="text.secondary">{selectedProduct.description}</Typography>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Typography variant="h6" color="primary" sx={{ marginRight: '16px' }} className='w-1/2' >₹{(quantity * selectedProduct.price).toFixed(2)}</Typography>
                    <Box display="flex" alignItems="center" mt={1} sx={{ p: 1, backgroundColor: 'background.default', borderRadius: '4px' }}>
                      <LocalOfferIcon fontSize="small" sx={{ color: (theme) => theme.palette.secondary.main, mr: 1 }} />
                      <Typography variant="body2" color='secondary'>
                        Discount: {selectedProduct.discount ? `${selectedProduct.discount}%` : 'None'}
                      </Typography>
                    </Box>                </Box>
                  <Box display="flex" alignItems="center" mb={2} className="w-full">
                    <Typography variant="body2" color="text.secondary" sx={{ marginRight: '16px' }} className='w-1/2'><strong>Stoke:</strong> {selectedProduct.stock_quantity}</Typography>
                    <Typography variant="body2" color="text.secondary" className='w-1/2'><strong>Type :</strong> {selectedProduct.category === 'medicine' ? 'Medicine' : 'Feed'}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mt={2} mb={2}>
                    <Paper elevation={3} sx={{ p: 0.5, display: 'flex', alignItems: 'center', backgroundColor: 'background.paper' }}>
                      <IconButton onClick={() => handleQuantityChange('decrease')} sx={{ border: '1px solid', borderRadius: '4px', p: 0.5, backgroundColor: 'action.hover', color: 'text.primary' }}><ArrowDownwardIcon fontSize="small" /></IconButton>
                      <Typography variant="body1" sx={{ mx: 1, minWidth: '40px', textAlign: 'center' }}>{quantity}</Typography>
                      <IconButton onClick={() => handleQuantityChange('increase')} sx={{ border: '1px solid', borderRadius: '4px', p: 0.5, backgroundColor: 'action.hover', color: 'text.primary' }}><ArrowUpwardIcon fontSize="small" /></IconButton>
                    </Paper>
                  </Box>
                  <Paper elevation={3} sx={{ p: 0.5, display: 'flex', alignItems: 'center', backgroundColor: 'background.paper' }}>
                    <Typography color='warning'>Note : Home Delivery not available</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setModalOpen(false)} color="error" variant="outlined">Cancel</Button>
              <Button onClick={handleConfirmPurchase} variant="contained" color="secondary"> Purchase Now</Button>
            </DialogActions>
          </Dialog>
        )}
      </Container>
    </MainLayout>
  );
};

export default Product;
