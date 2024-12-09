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
  TextField,
} from '@mui/material';
import CartCard from './CartCard';
import BASE_API_URL from '../config';
import axios from 'axios';

function CheckoutPage() {
  const steps = ['Cart', 'Address', 'Payment'];
  const [cartData, setCartData] = useState(null);
  const [priceData, setPriceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addressData, setAddressData] = useState({
    address_name: '',
    address_area: '',
    address_landmark: '',
    address_town: '',
    address_state: '',
    address_pincode: '',
    mobile: '',
  });

  const [isAddressValid, setIsAddressValid] = useState(false);

  // Validate address fields
  useEffect(() => {
    const {
      address_name,
      address_area,
      address_landmark,
      address_town,
      address_state,
      address_pincode,
      mobile,
    } = addressData;
    setIsAddressValid(
      address_name.trim() &&
        address_area.trim() &&
        address_landmark.trim() &&
        address_town.trim() &&
        address_state.trim() &&
        address_pincode.trim() &&
        mobile
    );
  }, [addressData]);

  const handleInputChange = (field, value) => {
    setAddressData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePayment = () => {
    const token = localStorage.getItem('token');
    if (isAddressValid && token) {
      axios
        .post(BASE_API_URL + '/payment', { token, ...addressData })
        .then((response) => {
          const { status } = response.data;
          if (status) {
            window.open(status, '_self'); // Open the link in a new tab
          }
        })
        .catch((error) => {
          console.error('Error during payment:', error);
        });
    }
  };

  useEffect(() => {
    const fetchCartAndAddressDetails = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const [cartResponse, cartPriceResponse] = await Promise.all([
            axios.post(BASE_API_URL + '/get_cart_details', { token }),
            axios.post(BASE_API_URL + '/get_cart_price', { token }),
          ]);

          setCartData(cartResponse.data);
          setPriceData(cartPriceResponse.data[0]);
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

  return (
    <Box
      p={2}
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Stepper */}
      <Box
        p={2}
        sx={{
          width: '100%',
          maxWidth: '1500px',
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
          gap: '30px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <Box sx={{ flex: 6 }}>
          {/* Address Section */}
          <span className="heading-small">Shipping Address</span>
          <Box
            mt={1}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              padding: '15px',
              borderRadius: '8px',
              width: '100%',
            }}
          >
            {[
              { field: 'address_name', label: 'Name' },
              { field: 'address_area', label: 'Flat, House No., Building' },
              { field: 'address_landmark', label: 'Landmark' },
              { field: 'address_pincode', label: 'Pincode' },
              { field: 'address_town', label: 'Town/City' },
              { field: 'address_state', label: 'State' },
              { field: 'mobile', label: 'Phone Number' },
            ].map(({ field, label }, index) => (
              <TextField
                key={index}
                id={field}
                label={label}
                size="small"
                variant="outlined"
                fullWidth
                value={addressData[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
              />
            ))}
          </Box>
          <Stack mt={2}>
            <span className="heading-small">Items in Bag</span>
            {cartData.map((item) => (
              <CartCard key={item.id} item={item} />
            ))}
          </Stack>
        </Box>

        <Box sx={{ flex: 4 }}>
          <span className="heading-small">
            Price Details ({cartData?.length || 0} Item
            {cartData?.length > 1 ? 's' : ''})
          </span>

          <Box
            sx={{
              pt: 3,
            }}
          >
            {/* Price Breakdown */}
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between">
                <Typography>Total MRP</Typography>
                <Typography>₹{priceData.subtotal.toFixed(2)}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography>Shipping Fee</Typography>
                <Typography>
                  {priceData.shipping_charges === 0
                    ? 'FREE'
                    : `₹${priceData.shipping_charges.toFixed(2)}`}
                </Typography>
              </Stack>
            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mt: 2 }}
            >
              <Typography>Total Amount</Typography>
              <Typography>₹{priceData.total.toFixed(2)}</Typography>
            </Stack>

            <Button
              variant="contained"
              fullWidth
              onClick={handlePayment}
              sx={{ mt: 4 }}
              disabled={!isAddressValid}
            >
              Place Order
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CheckoutPage;
