import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

const CartCard = ({ item }) => {
  return (
    <Paper
      sx={{
        borderRadius: 2,
        padding: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: 2, // Add spacing between cards
      }}
    >
      {/* Image Section */}
      <Box
        sx={{
          flexShrink: 0,
          width: '80px',
          height: '80px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          borderRadius: 2,
          backgroundColor: '#f5f5f5', // Add a subtle background for better contrast
        }}
      >
        <img
          src={item.thumbnail.split(',')[0]}
          alt={item.product_title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover', // Ensure the image fills the area without distortion
          }}
        />
      </Box>

      {/* Product Info Section */}
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 'bold', color: '#333', mb: 1 }}
          noWrap
        >
          {item.product_title}
        </Typography>
        <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
          Quantity: {item.quantity}
        </Typography>
        <Typography variant="body2" sx={{ color: '#666' }}>
          {item.product_description || 'No description available'}
        </Typography>
      </Box>

      {/* Price Section */}
      <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#000' }}>
          ₹{item.price.toFixed(2)}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: 'gray', fontStyle: 'italic' }}
        >
          Per unit
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: 'gray', fontStyle: 'italic', display: 'block', mt: 0.5 }}
        >
          Total: ₹{(item.price * item.quantity).toFixed(2)}
        </Typography>
      </Box>
    </Paper>
  );
};

export default CartCard;
