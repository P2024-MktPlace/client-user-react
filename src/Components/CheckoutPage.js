import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Stack,
  CircularProgress,
} from '@mui/material';
import CartCard from './CartCard';
import BASE_API_URL from '../config';
import axios from 'axios';
import AddressComponent from './MiniComponents/AddAddress';

function CheckoutPage() {
  const steps = ['Cart', 'Address', 'Payment'];
  const [cartData, setCartData] = useState(null);
  const [priceData, setPriceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addressData, setAddressData] = useState(null);
  const [open, setOpen] = useState(false);

  const handlepayment =() =>{
    const token = localStorage.getItem('token');
    axios.post(BASE_API_URL + '/payment', { token })
    .then((response) => {
      // Assuming the status link is in `response.data.status`
      const { status } = response.data;
      if (status) {
        window.open(status, '_self'); // Open the link in a new tab
      } 
    })
    .catch((error) => {
      console.error('Error during payment:', error);
    });
  }

  const handleAddressClickOpen = () => {
    setOpen(true);
  };

  const handleAddressClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchCartAndAddressDetails = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const [cartResponse, addressResponse, cartpriceresponse] = await Promise.all([
            axios.post(BASE_API_URL + '/get_cart_details', { token }),
            axios.post(BASE_API_URL + '/getaddress', { token }),
            axios.post(BASE_API_URL + '/get_cart_price', { token }),
          ]);

          setCartData(cartResponse.data);
          setAddressData(addressResponse.data);
          setPriceData(cartpriceresponse.data[0]);

        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      } else {
        setError('No token found');
        setLoading(false);
      }
    };

    fetchCartAndAddressDetails();
  }, []);

  if (loading) {
    return (
      <Box
        p={4}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4}>
        <Typography color="error">{error.message || error}</Typography>
      </Box>
    );
  }

  const isAddressAvailable = addressData && addressData.length > 0;

  return (
    <Box p={2} sx={{ width: '100%' }}>
      {/* Stepper */}
      <Box 
        p={2}
        sx={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <Stepper activeStep={1} sx={{ marginBottom: '24px' }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Box
        p={2}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: '16px',
        }}
      >
        <Box sx={{ flex: 6 }}>
          {/* Address Section */}
          <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '16px',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            backgroundColor: '#fafafa',
            marginBottom: '16px',
            width: '100%',
          }}
        >
          {isAddressAvailable ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' }, // column on mobile, row on desktop
                justifyContent: { xs: 'center', md: 'space-between' }, // align differently on mobile
                alignItems: { xs: 'flex-start', md: 'center' }, // center items vertically on desktop
                width: '100%',
              }}
            >
              <Box>
                <Typography variant="body2">
                  Deliver to: <strong>{addressData[0].name}, {addressData[0].pincode}</strong>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {addressData[0].address}, {addressData[0].city}, {addressData[0].state}
                </Typography>
              </Box>
              <Button
                variant="outlined"
                color="error"
                sx={{ mt: { xs: 2, md: 0 } }} // margin-top only on mobile
                onClick={handleAddressClickOpen}
              >
                Change Address
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' }, // column on mobile, row on desktop
                justifyContent: { xs: 'center', md: 'space-between' },
                alignItems: { xs: 'flex-start', md: 'center' },
                width: '100%',
              }}
            >
              <Typography variant="body2" color="error">
                No address available. Please add an address to proceed.
              </Typography>
              <Button
                variant="outlined"
                color="error"
                sx={{ mt: { xs: 2, md: 0 } }} // margin-top only on mobile
                onClick={handleAddressClickOpen}
              >
                Add Address
              </Button>
            </Box>
          )}

          {/* Address Modal */}
          <AddressComponent open={open} handleClose={handleAddressClose} />
        </Box>



          <Stack>
            <span className='heading-small'>Items in bag</span>
            {cartData.map((item) => (
              <CartCard key={item.id} item={item} />
            ))}
          </Stack>
        </Box>

        <Box sx={{ flex: 4 }}>
          {/* Price Details Section */}
          <Box
            sx={{
              border: '1px solid #e0e0e0',
              padding: 2,
              borderRadius: 2,
              backgroundColor: '#fff',
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              PRICE DETAILS ({cartData?.length || 0} Item{cartData?.length > 1 ? 's' : ''})
            </Typography>

            <Stack spacing={1} mt={2}>
            
            <Stack direction="row" justifyContent="space-between">
              <Typography>Total MRP</Typography>
              <Typography>₹{priceData.subtotal.toFixed(2)}</Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography>Discount on MRP</Typography>
              <Typography sx={{ color: 'green' }}>- ₹{priceData.saved.toFixed(2)}</Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography>Shipping Fee</Typography>
              <Typography>{priceData.shipping_charges === 0 ? 'FREE' : `₹${priceData.shipping_charges.toFixed(2)}`}</Typography>
            </Stack>
          </Stack>

          <Stack direction="row" justifyContent="space-between" mt={2} sx={{ fontWeight: 'bold' }}>
            <Typography>Total Amount</Typography>
            <Typography>₹{priceData.total.toFixed(2)}</Typography>
          </Stack>

            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={handlepayment}
              sx={{ mt: 2, borderRadius: 1 }}
              disabled={!isAddressAvailable} // Disable if no address
            >
              PLACE ORDER
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CheckoutPage;
