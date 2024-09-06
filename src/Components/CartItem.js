import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Chip,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Stack,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

const CartItem = ({ item }) => {
  const [count, setCount] = useState(1); // Default count is 1
  const [openDialog, setOpenDialog] = useState(false);
  const [thumbnail, setThumbnail] = useState('');

  useEffect(() => {
    setThumbnail(item.thumbnail.split(',')[0]);
  }, [item.thumbnail]);

  const handleIncrement = () => setCount(count + 1);

  const handleDecrement = () => {
    if (count === 1) {
      setOpenDialog(true); // Show confirmation dialog when count reaches 0
    } else {
      setCount(count - 1);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmRemove = () => {
    setOpenDialog(false);
    // Implement the logic to remove the item from the cart here
    // For demonstration, just log to console
    console.log('Item removed from cart');
    // Optionally, reset count or perform other actions
    setCount(0);
  };

  return (
    <Box sx={{ border: '1px solid #ddd', borderRadius: 2, p: 1, mb: 2 }}>
      <Stack>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* Image Section */}
          <img
            src={thumbnail}
            alt={item.product_title}
            style={{
              flexShrink: 0,
              width: 60,
              height: 60,
              objectFit: 'cover',
              objectPosition: 'center',
              borderRadius: '4px',
            }}
          />
          {/* Middle Section */}
          <Box sx={{ flexGrow: 1, ml: 2 }}>
            <span>{item.product_id}</span>
            <span className="item-name">{item.product_title}</span>

            {/* <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          {item.product_title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {item.category}
        </Typography> */}
            {/* <Typography variant="body2" color="error">
          only 1 Left
        </Typography> */}
          </Box>
          {/* Right Section */}
          <Box sx={{ textAlign: 'right' }}>
            <IconButton size="small" aria-label="remove">
              <DeleteIcon fontSize="small" />
            </IconButton>
            {/* <Typography variant="h6" sx={{ mt: 1, mb: 1 }}>
          ₹{item.price}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <IconButton onClick={handleDecrement} aria-label="decrement">
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Chip label={count} sx={{ mx: 1 }} />
          <IconButton onClick={handleIncrement} aria-label="increment">
            <AddIcon fontSize="small" />
          </IconButton>
        </Box> */}
          </Box>
          {/* Confirmation Dialog
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Removal</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this item from the cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmRemove} color="secondary">
            Remove
          </Button>
        </DialogActions>
      </Dialog> */}
        </Box>
        <Box
          className="bt"
          mt={1}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <span>Quantity: {item.quantity}</span>
          <span>Rs. 300</span>
        </Box>
      </Stack>
    </Box>
  );
};

export default CartItem;
