import React from 'react';
import {
  Box,
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Stack,
} from '@mui/material';
import CartCard from './CartCard';

function CheckoutPage() {
  // Define steps
  const steps = ['Cart', 'Address', 'Payment'];

  return (
    <Box p={2} sx={{ width: '100%' }}>
      {/* Stepper */}
      <Box mr={45} ml={45} p={2}>
        <Stepper activeStep={0} sx={{ marginBottom: '24px' }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Box
        p={4}
        sx={{
          display: 'flex',
          gap: '16px',
        }}
      >
        <Box sx={{ flex: 3 }}>
          {/* 60% Section */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              backgroundColor: '#fafafa',
            }}
          >
            <Box>
              <Typography variant="body2">
                Deliver to: <strong>CHETHAN S, 560037</strong>
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Room No A410, Boys PG, Jeevith Gardens, ACES Layout,
                Brookefield, Bangalore
              </Typography>
            </Box>
            <Button variant="outlined" color="error">
              Change Address
            </Button>
          </Box>

          <Stack>
            <CartCard />
          </Stack>
        </Box>
        <Box sx={{ flex: 2, backgroundColor: '#e0e0e0', padding: '16px' }}>
          {/* 40% Section */}
          <p>This is the 40% width section.</p>
        </Box>
      </Box>
    </Box>
  );
}

export default CheckoutPage;
