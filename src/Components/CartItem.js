import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Stack,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'; // Import the Edit icon
import AddIcon from '@mui/icons-material/Add'; // Importing Add Icon
import RemoveIcon from '@mui/icons-material/Remove'; // Importing Remove Icon
import BASE_API_URL from '../config';

const CartItem = ({ item, onQuantityChangeSuccess }) => {
  const [count, setCount] = useState(1); // Default count is 1
  const [thumbnail, setThumbnail] = useState('');
  const [quantity, setQuantity] = useState(item.quantity); // Set initial quantity from item
  const [editModalOpen, setEditModalOpen] = useState(false); // State for modal

  const handleIncrement = async () => {
    const token = localStorage.getItem('token');
    await fetch(BASE_API_URL + '/add_to_cart', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include token in the headers
      },
      body: JSON.stringify({
          product_id: item.product_id,
          quantity: 1,
          token: token,
      })
  });

  onQuantityChangeSuccess();
  };

  const handleDecrement = async () => {
    const token = localStorage.getItem('token');
    await fetch(BASE_API_URL + '/add_to_cart', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include token in the headers
      },
      body: JSON.stringify({
          product_id: item.product_id,
          quantity: -1,
          token: token,
      })
  });
  onQuantityChangeSuccess();
  };

  // Open modal when the box is clicked
  const handleBoxClick = () => {
    setEditModalOpen(true);
  };

  useEffect(() => {
    setThumbnail(item.thumbnail.split(',')[0]);
  }, [item.thumbnail]);

  return (
    <>
      {item.quantity === 0 ? (
        <div></div>
      ) : (
          <Box sx={{ border: '1px solid #ddd', borderRadius: 2 }}>
            <Stack>
              <Box m={1} sx={{ display: 'flex' }}>
                <Box
                  sx={{
                    width: 80, // Ensure width and height are the same to maintain 1:1 aspect ratio
                    height: 80,
                    overflow: 'hidden',
                    borderRadius: '4px',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={thumbnail}
                    alt={item.product_title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                  />
                </Box>

                <Stack
                  sx={{
                    flexGrow: 1,
                    ml: 1,
                    display: 'flex', // Use flexbox layout
                    flexDirection: 'column', // Align items in a column
                    justifyContent: 'space-between', // Space out title and quantity
                  }}
                >
                  <Typography
                    className="item-title"
                    variant="body1"
                    sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, fontWeight: 'bold' }}
                  >
                    {item.product_title}
                  </Typography>

                 
                </Stack>
              </Box>

              <Box className="bt">
                <Box
                  m={1}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: { xs: '0.8rem', sm: '1rem' },
                  }}
                >

              <Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <span sx={{ fontSize: { xs: '0.7rem', sm: '0.9rem' } }}>Quantity :</span>

                      {/* Box wrapper to apply border styling */}
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          border: '1px solid #ddd', // Border style
                          borderRadius: '4px', // Rounded corners
                          padding: '2px 8px', // Inner padding to space out elements
                        }}
                      >
                        <IconButton size="small" onClick={handleDecrement} >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography style={{ fontSize: '0.9rem', margin: '0 4px' }}>{quantity}</Typography>
                        <IconButton size="small" onClick={handleIncrement}>
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Stack>
                  </Box>
                  <Box>
                    <div>
                      {/* Box with edit icon */}
                      <Box
                        onClick={handleBoxClick}
                        sx={{
                          cursor: 'pointer', // Set cursor to pointer
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        {/* Include edit icon here, e.g., <EditIcon /> */}
                      </Box>
                      {/* Modal Component */}
                    </div>
                  </Box>
                  <span sx={{ fontSize: { xs: '0.7rem', sm: '0.9rem' } }}>Rs. {item.price}</span>
                </Box>
              </Box>
            </Stack>
          </Box>

      )}
    </>
  );
};

export default CartItem;
