import React, { useState } from 'react';
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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function CartItem() {
  const [count, setCount] = useState(1); // Default count is 1
  const [openDialog, setOpenDialog] = useState(false);

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
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #ddd',
        borderRadius: 2,
        p: 1,
        mb: 2,
      }}
    >
      {/* Image Section */}
      <Box
        sx={{
          flexShrink: 0,
          width: 50,
          height: 50,
          backgroundImage: `url('https://via.placeholder.com/100')`, // Placeholder image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 1,
        }}
      />

      {/* Middle Section */}
      <Box sx={{ flexGrow: 1 }} ml={1}>
        <span className="item-title">Sample Product</span>
        <span className="item-price">Category Name</span>
      </Box>

      {/* Right Section */}
      <Box sx={{ textAlign: 'center' }}>
        <span variant="h6" sx={{ mb: 1 }}>
          $29.99
        </span>
        {/* <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <IconButton onClick={handleDecrement} aria-label="decrement">
            <RemoveIcon fontSize="3" />
          </IconButton>
          <Chip label={count} />
          <IconButton onClick={handleIncrement} aria-label="increment">
            <AddIcon fontSize="3" />
          </IconButton>
        </Box> */}
      </Box>

      {/* Confirmation Dialog */}
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
      </Dialog>
    </Box>
  );
}

export default CartItem;
