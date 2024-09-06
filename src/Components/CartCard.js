import {
  Box,
  Stack,
  Typography,
  IconButton,
  TextField,
  Paper,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import React, { useState } from 'react';

function CartCard() {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
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
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src="https://via.placeholder.com/80"
          alt="Product"
          style={{ borderRadius: '8px', width: '100%', maxWidth: '80px' }}
        />
      </Box>

      {/* Product Info Section */}
      <Box sx={{ flex: 3 }}>
        <span className="item-name">Cardigan</span>
        <Typography variant="body2" color="textSecondary">
          Category
        </Typography>
      </Box>

      {/* Quantity Section */}
      <Box
        sx={{
          flex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconButton onClick={handleDecrement}>
          <RemoveIcon />
        </IconButton>
        <TextField
          size="small"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          inputProps={{ min: 1, max: 10 }}
          sx={{ width: 60, textAlign: 'right' }}
        />
        <IconButton onClick={handleIncrement}>
          <AddIcon />
        </IconButton>
      </Box>

      {/* Price Section */}
      <Box sx={{ flex: 2, textAlign: 'right' }} p={2}>
        <span className="checkout_price">Rs. 2,500.00</span>
      </Box>
    </Paper>
  );
}

export default CartCard;
