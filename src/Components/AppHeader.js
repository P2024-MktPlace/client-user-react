import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import cartDetails from './cartProducts'; // Ensure you have the correct import path
import AuthModal from './AuthModal'; // Import the modal component

function ResponsiveAppBar() {
  const [open, setOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by checking if a token exists in localStorage or sessionStorage
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');
    setUserLoggedIn(!!token);
  }, []);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleAddToCart = () => {
    if (!userLoggedIn) {
      setAuthModalOpen(true); // Open the modal if user is not logged in
    } else {
      setOpen(true); // Open the cart drawer
    }
  };

  const handleProfileClick = () => {
    if (!userLoggedIn) {
      setAuthModalOpen(true); // Open the modal if user is not logged in
    } else {
      setOpen(true); // Open the drawer (assuming you want to show the same drawer)
    }
  };

  const handleLoginSuccess = () => {
    // Update the userLoggedIn state and possibly close the auth modal
    setUserLoggedIn(true);
    setAuthModalOpen(false);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: 2,
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #eeeeee',
      }}
    >
      <Grid container spacing={2} alignItems="center">
        {/* Top Row for Logo, Cart, and Profile */}
        <Grid item xs={12}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            flexWrap="wrap"
          >
            <img
              className="logo"
              src={'https://dummyimage.com/150x75/b0000/fff'}
              alt="Logo"
              loading="lazy"
              style={{ maxWidth: '100px', height: 'auto' }}
            />
            <Stack direction="row" spacing={2} alignItems="center">
              <IconButton
                size="medium"
                aria-label="show shopping cart"
                color="inherit"
                onClick={handleAddToCart}
              >
                <Badge badgeContent={17} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                {cartDetails()}
              </Drawer>
              <IconButton
                size="large"
                aria-label="user profile"
                color="inherit"
                onClick={handleProfileClick}
              >
                <Avatar alt="User Profile" src="/static/images/avatar/1.jpg" />
              </IconButton>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <AuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </Box>
  );
}

export default ResponsiveAppBar;
