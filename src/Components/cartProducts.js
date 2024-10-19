import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Button, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import axios from 'axios';
import BASE_API_URL from '../config';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';
import loadingGIF from '../gifs/loading.gif';
import emptyCart from '../gifs/empty_cart.gif'
import CloseIcon from '@mui/icons-material/Close'; 


function CartDetails({ refresh, onClose  }) {
  const [cartData, setCartData] = useState(null);
  const [priceData, setPriceData] = useState(null); // State for price details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/checkout');
  };

  const fetchCartDetails = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const [cartResponse, priceResponse] = await Promise.all([
          axios.post(BASE_API_URL + '/get_cart_details', { token }),
          axios.post(BASE_API_URL + '/get_cart_price', { token }) // Fetch cart price
        ]);
        
        setCartData(cartResponse.data);
        setPriceData(priceResponse.data[0]); // Set the price data
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    } else {
      setLoading(false);
      setError('No token found');
    }
  };

  useEffect(() => {
    fetchCartDetails();
  }, [refresh]);

  if (loading) {
    return( 
    <Box sx={{ width: 350 }} p={2}>
      <div><img src={loadingGIF} alt="Loading..." /></div>
    </Box>
    );
  }

  if (error) {
    return( 
      <Box sx={{ width: 350 }} p={2}>
        <div><img src={loadingGIF} alt="Loading..." /></div>
      </Box>
      );
  }

  // If no items in cart
  if (!cartData || cartData.length === 0) {
    return( 
      <Stack m={2} alignItems="center">
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
          <Typography variant="h5" className="product_title" sx={{ flexGrow: 1, textAlign: 'center' }}>
            My Cart
          </Typography>
          <IconButton >
            <CloseIcon onClick={onClose}/>
          </IconButton>
        </Box>

        <Box mt={1} sx={{ width: '100%' }}>
          <Divider />
        </Box>

        <Box sx={{ width: 350 }} p={4} display="flex" justifyContent="center" alignItems="center">
          <div>
            <img 
              src={emptyCart} 
              alt="Empty cart..." 
              style={{ width: '100%', height: 'auto' }} // Set width to 100% and height to auto
            />
          </div>
        </Box>

        <Box p={2} justifyContent="center" display="flex">
          <span className='cart-info-text'>
            NO ITEMS IN CART
          </span>
        </Box>

        <Box display="flex" justifyContent="center" alignItems="center">
          <Button 
            size="large" 
            variant="contained" 
            sx={{ fontSize: '16px', backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#333' } }}
          >
            GO SHOPPING
          </Button>
        </Box>
      </Stack>

      
      );
  }

  // Destructure price data fields
  const { subtotal = '-', shipping_charges = 0, total = '-', saved = 0, round_off = 0 } = priceData || {};

  return (
    <div>
      <Box sx={{ width: 350 }} m={2} role="presentation">
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
          <Typography variant="h5" className="product_title" sx={{ flexGrow: 1, textAlign: 'center' }}>
            My Cart
          </Typography>
          <IconButton >
            <CloseIcon onClick={onClose}/>
          </IconButton>
        </Box>

        <Box mt={1} sx={{ width: '100%' }}>
          <Divider />
        </Box>

        <Stack mt={2}  spacing={2}>
          {cartData.map((item) => (
            <CartItem key={item.id} item={item} onQuantityChangeSuccess={fetchCartDetails} />
          ))}
        </Stack>
      </Box>

      <Divider className="divider" component="div" role="presentation" />

      <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <span className='cart-key'>Subtotal</span>
        </Grid>
        <Grid item xs={4} textAlign="end">
          <span className='cart-value'>₹{subtotal}</span>
        </Grid>
      </Grid>
      
      <Grid container spacing={2}>
        <Grid item xs={8}>
        <span className='cart-key'>Discount Saved</span>
        </Grid>
        <Grid item xs={4} textAlign="end" sx={{ color: 'green' }}>
        <span className='cart-value'>- ₹{saved}</span>
        </Grid>
      </Grid>
      
      <Grid container spacing={2}>
        <Grid item xs={8}>
        <span className='cart-key'>Shipping Charges</span>
        </Grid>
        <Grid item xs={4} textAlign="end">
        <span className='cart-value'>{shipping_charges === 0 ? 'FREE' : `₹${shipping_charges}`}</span>
        </Grid>
      </Grid>
      
      <Grid container spacing={2}>
        <Grid item xs={8}>
        <span className='cart-key'>Round Off</span>
        </Grid>
        <Grid item xs={4} textAlign="end">
        <span className='cart-value'>₹{round_off}</span>
        </Grid>
      </Grid>
    </Box>

    <Divider className="divider" component="div" role="presentation" />

    <Box p={2}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8}>
        <span className='cart-value'>Total</span>
        </Grid>
        <Grid item xs={4} textAlign="end" >
          <Stack direction="row" justifyContent="flex-end" alignItems="baseline">
            <Typography sx={{ mr: 1, fontSize: '1rem', color: 'grey' }}>INR</Typography>
            <span className='total-cart-price'>₹{total}</span>
          </Stack>
        </Grid>
      </Grid>
    </Box>


      <Divider className="divider" component="div" role="presentation" />

      <Box p={2} className="fullwidth">
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button 
            size="large" 
            className="fullwidth"
            disableElevation
            variant="contained" 
            onClick={handleClick}
            sx={{ fontSize: '16px', backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#333' } }}
          >
           Proceed to Checkout
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default CartDetails;
