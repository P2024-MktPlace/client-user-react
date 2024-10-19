import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import Menu from '@mui/material/Menu'; // Import Menu
import MenuItem from '@mui/material/MenuItem'; // Import MenuItem
import CartDetails from './cartProducts';
import AuthModal from './AuthModal';

function ResponsiveAppBar() {
  const [open, setOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // State for menu
  const openMenu = Boolean(anchorEl);

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    setUserLoggedIn(!!token);
  }, [authModalOpen]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleAddToCart = () => {
    if (!userLoggedIn) {
      setAuthModalOpen(true);
    } else {
      setOpen(true);
    }
  };

  const handleProfileClick = (event) => {
    if (!userLoggedIn) {
      setAuthModalOpen(true);
    } else {
      setAnchorEl(event.currentTarget); // Open menu
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close menu
  };

  const handleLoginSuccess = () => {
    setUserLoggedIn(true);
    setAuthModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    setUserLoggedIn(false);
    handleMenuClose();
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
                <Badge color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <CartDetails refresh={open} onClose={closeModal} />
              </Drawer>
              <IconButton
                size="large"
                aria-label="user profile"
                color="inherit"
                onClick={handleProfileClick}
              >
                <Avatar alt="User Profile" src="/static/images/avatar/1.jpg" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleMenuClose}>My Orders</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
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
