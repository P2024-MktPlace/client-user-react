import {
  Box,
  Stack,
  Typography,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import MyOrderProduct from '../MiniComponents/MyOrderProduct';
import BASE_API_URL from '../../config';

const MyOrders = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(orderDetails);
  useEffect(() => {
    const fetchOrderDetails = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication token not found. Please login.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${BASE_API_URL}/myorders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders. Please try again later.');
        }

        const data = await response.json();
        setOrderDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress /> {/* Loading spinner */}
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" mt={2}>
        <Alert severity="error">{error}</Alert> {/* Error message */}
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" width="100%">
      <Box
        sx={{
          display: 'flex',
          width: '100%', // Makes it responsive
          maxWidth: '1200px', // Maximum width of 1200px
          flexDirection: 'column',
        }}
      >
        <Box flexBasis="100%" p={2}>
          <span className="settings-heading">Your Orders</span>
          <Divider sx={{ mt: 1, mb: 3 }} />

          {orderDetails.length > 0 ? (
            <Stack mt={2} spacing={2}>
              {orderDetails.map((item) => (
                <MyOrderProduct key={item.order_id} item={item} />
              ))}
            </Stack>
          ) : (
            <Typography variant="body1" mt={2} textAlign="center">
              No orders found.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MyOrders;
