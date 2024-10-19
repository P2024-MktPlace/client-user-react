import { Box, Paper } from '@mui/material';
import React from 'react';

const CartCard = ({ item }) => {
  return (
    <Box mt={2}>
      <Paper
        sx={{
          borderRadius: 2,
          padding: 1,
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* Image Section */}
        <Box
          sx={{
            flex: 1,
            padding: 1,
            display: 'flex',
            justifyContent: 'left',
            alignItems: 'center',
          }}
        >
          <img
            src={item.thumbnail.split(',')[0]}
            alt={item.product_title}
            style={{
              borderRadius: '8px',
              width: '60px',
              height: '60px',
              objectFit: 'cover', // Ensures the image covers the area without distortion
            }}
          />
        </Box>

        {/* Product Info Section */}
        <Box sx={{ flex: 3 }}>
          <span className="checkout_item-name">{item.product_title}</span>
        </Box>
        <Box sx={{ flex: 2, textAlign: 'right' }} p={2}>
          <span className="checkout_price">Rs. {item.price} /-</span>
        </Box>
      </Paper>
    </Box>
  );
};

export default CartCard;
