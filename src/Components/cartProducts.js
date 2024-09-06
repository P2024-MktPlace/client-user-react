import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Button, Divider, Grid, Stack, Typography } from '@mui/material';
import axios from 'axios';
import BASE_API_URL from '../config';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';

function CartDetails() {
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Inside your component
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/checkout');
  };

  useEffect(() => {
    const fetchCartDetails = async () => {
      const token = localStorage.getItem('token');
      console.log(token);
      if (token) {
        try {
          const response = await axios.post(
            BASE_API_URL + '/get_cart_details',
            { token }
          );
          setCartData(response);
          setLoading(false);
          console.log(response);
        } catch (err) {
          setError(err);
          setLoading(false);
        }
      } else {
        setLoading(false);
        setError('No token found');
      }
    };

    fetchCartDetails(); // Fetch cart details on component mount
  }, []); // Empty dependency array ensures this runs once on mount

  const handleUpdate = () => {
    const fetchCartDetails = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.post(
            BASE_API_URL + '/get_cart_details',
            { token }
          );
          setCartData(response.data);
          console.log(response.data);
        } catch (err) {
          setError(err);
        }
      }
    };

    fetchCartDetails(); // Refresh cart details after an update or removal
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message || 'An error occurred'}</div>;
  }

  const subtotal = '-';
  const shippingCharges = '00';
  const total = '0000';
  return (
    <div>
      <Box sx={{ width: 350 }} p={2} role="presentation">
        <Typography variant="h6" className="product_title">
          My Cart
        </Typography>

        <Stack mt={2}>
          {cartData.data.map((item) => (
            <CartItem key={item.id} item={item} onUpdate={handleUpdate} />
          ))}
        </Stack>
      </Box>

      <Divider className="divider" component="div" role="presentation" />

      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography>Subtotal</Typography>
          </Grid>
          <Grid item xs={4} textAlign="end">
            <Typography>{subtotal}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography>Shipping Charges</Typography>
          </Grid>
          <Grid item xs={4} textAlign="end">
            <Typography>{shippingCharges}</Typography>
          </Grid>
        </Grid>
      </Box>

      <Divider className="divider" component="div" role="presentation" />

      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography>Total</Typography>
          </Grid>
          <Grid item xs={4} textAlign="end">
            <Typography>{total}</Typography>
          </Grid>
        </Grid>
      </Box>

      <Divider className="divider" component="div" role="presentation" />

      <Box p={2} className="fullwidth">
        <Button
          variant="contained"
          className="fullwidth"
          disableElevation
          onClick={handleClick}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </div>
  );
}

export default CartDetails;
