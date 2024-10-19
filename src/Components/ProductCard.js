import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Box, ButtonBase, Grid, Stack } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';
import BASE_API_URL from '../config'; // Ensure this points to the correct config file

import AuthModal from './AuthModal'; // Import the modal component

const ProductCard = ({ item }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = () => {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      // POST request to verify token
      axios
        .post(BASE_API_URL + '/verify', { token })
        .then((response) => {
          setUserLoggedIn(true);
          setLoading(false);
        })
        .catch((err) => {
          // Handle error and stop loading
          setError(err.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setUserLoggedIn(false);
    }
  };

  const handleAddToCart = (event) => {
    event.stopPropagation(); // Prevents the event from bubbling up to the card

    if (!userLoggedIn) {
      setAuthModalOpen(true);
    } else {
      const token =
        localStorage.getItem('token') || sessionStorage.getItem('token');
      axios
        .post(BASE_API_URL + '/add_to_cart', {
          token,
          product_id: item.product_id,
          quantity: 1,
        })
        .then((response) => {
          setUserLoggedIn(true);
          setLoading(false);
        })
        .catch((err) => {
          // Handle error and stop loading
          setError(err.message);
          setLoading(false);
        });
    }
  };

  const handleLoginSuccess = () => {
    // Update the userLoggedIn state and close the auth modal
    setUserLoggedIn(true);
    setAuthModalOpen(false);
  };

  const openProduct = () => {
    window.location.href = `product/${item.id}`;
  };

  const discountAmount = (item.price * item.discount) / 100;
  const discountedPrice = item.price - discountAmount;

  return (
    <Card
      variant="outlined"
      sx={{
        width: 250,
        '&:hover': {
          boxShadow: 'md',
          borderColor: 'neutral.outlinedHoverBorder',
        },
      }}
    >
      <img
        className="cardImage"
        src=""
        srcSet=""
        loading="lazy"
        alt={item.product_title}
        onClick={openProduct} // Open product on image click
      />
      <Grid container sx={{ p: 1 }} alignItems="center">
        <Grid item xs={10}>
          <Box>
            <Typography>
              <span className="item-id">{item.product_id}</span>
              <span className="item-name">{item.product_title}</span>
              <span className="item-price">Rs. {item.price}/-</span>
              {item.discount > 0 && (
                <span className="item-discount">
                  <Typography variant="body2" color="textSecondary">
                    Discounted Price: Rs. {discountedPrice.toFixed(2)}/-
                  </Typography>
                </span>
              )}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box
            className="card-actions"
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%" // Ensure it takes the full height of the grid item
          >
            <Stack direction="column" alignItems="center">
              <Box display="flex" alignItems="center" mb={0.5}>
                <span className="item-price">4.5</span>
                <StarIcon sx={{ color: '#F4CE14', fontSize: 16, ml: 0.25 }} />
              </Box>

              <ButtonBase
                className="add-to-cart"
                onClick={handleAddToCart} // Updated click handler
                sx={{
                  padding: '4px', // Adjust padding here
                  borderRadius: '5px', // Match with CSS if needed
                  border: '1px solid #666666', // Match with CSS if needed
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.3s',
                  '&:hover': {
                    backgroundColor: '#f0f0f0', // Light background color on hover
                  },
                }}
              >
                <ShoppingCartIcon />
              </ButtonBase>
            </Stack>
          </Box>
        </Grid>
      </Grid>
      <AuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </Card>
  );
};

export default ProductCard;
