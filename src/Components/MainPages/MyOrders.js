import { Box, Stack, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import SettingMenu from '../MiniComponents/SettingMenu';
import MyOrderProduct from '../MiniComponents/MyOrderProduct';
import BASE_API_URL from '../../config';
import axios from 'axios';

const MyOrders = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const token = localStorage.getItem('token');
      if (!token) return; // Handle case when token is not found

      try {
        const response = await fetch(`${BASE_API_URL}/myorders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) throw new Error('Failed to fetch orders');

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

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <Box
      display="flex"
      justifyContent="center" // Center the content
      width="100%" // Full width of the viewport
      //   p={2}                     // Optional padding for better spacing
    >
      <Box
        sx={{
          display: 'flex',
          maxWidth: '1400px', // Set a maximum width for the container
          width: '70%', // Full width up to the max width
        }}
      >
        <Box flexBasis="100%" p={2}>
          <Typography sx={{ fontSize: '40px', fontStyle: 'bold' }}>
            My Orders
          </Typography>

          <Stack mt={2} spacing={2}>
            {orderDetails.map((item) => (
              <MyOrderProduct key={item.order_id} item={item} />
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default MyOrders;
