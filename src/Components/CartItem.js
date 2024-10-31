import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Stack,
  IconButton,
  Chip,
  Divider,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import BASE_API_URL from '../config';

const CartItem = ({ item, onQuantityChangeSuccess }) => {
  const [thumbnail, setThumbnail] = useState('');
  const [quantity, setQuantity] = useState(item.quantity);

  useEffect(() => {
    setThumbnail(item.thumbnail.split(',')[0]);
  }, [item.thumbnail]);

  const handleIncrement = async () => {
    const token = localStorage.getItem('token');
    await fetch(`${BASE_API_URL}/add_to_cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        token: token,
        product_id: item.product_id,
        quantity: 1,
      }),
    });
    onQuantityChangeSuccess();
    setQuantity(quantity + 1);
  };

  const handleDecrement = async () => {
    const token = localStorage.getItem('token');
    await fetch(`${BASE_API_URL}/add_to_cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        token: token,
        product_id: item.product_id,
        quantity: -1,
      }),
    });
    onQuantityChangeSuccess();
    setQuantity(quantity - 1);
  };

  const handleBoxClick = () => {
    // Handle Edit Icon click
    alert('Edit item functionality coming soon!');
  };

  return (
    <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: 2, mb: 2 }}>
      <Stack direction="row" spacing={2}>
        {/* Product Thumbnail */}
        <Box
          sx={{
            width: 80,
            height: 80,
            overflow: 'hidden',
            borderRadius: 1,
            border: '1px solid #eee',
            flexShrink: 0,
          }}
        >
          <img
            src={thumbnail}
            alt={item.product_title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>

        <Stack sx={{ flex: 1 }}>
          {/* Product Info */}
          <span className="order_name">
            {item.category || 'SYNTHESISER MODULES'}
          </span>

          <span className="cart-title">{item.product_title}</span>

          <Stack direction="row" spacing={1} mt={2} alignItems="center">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #ddd',
                borderRadius: 1,
              }}
            >
              <IconButton
                size="small"
                onClick={handleDecrement}
                aria-label="decrease quantity"
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography variant="body2" sx={{ mx: 1 }}>
                {quantity}
              </Typography>
              <IconButton
                size="small"
                onClick={handleIncrement}
                aria-label="increase quantity"
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
            <Box
              sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}
            >
              <span className="cart-price">
                {' ₹ '}

                {item.price !== undefined && quantity > 0
                  ? new Intl.NumberFormat('en-IN').format(item.price * quantity)
                  : 'N/A'}
              </span>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default CartItem;
