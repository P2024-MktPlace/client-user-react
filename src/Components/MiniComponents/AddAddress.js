import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Stack,
  Button,
  Box,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import BASE_API_URL from '../../config';


const AddAddress = ({ open, handleClose }) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [country, setCountry] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSubmit = async () => {
    // Check if all fields are filled
    if (!name || !mobile || !address || !city || !state || !pincode) {
      setSnackbarMessage('All fields are required.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    const token = localStorage.getItem('token');
    const postData = {
      token,
      name,
      mobile,
      address,
      city,
      state,
      pincode,
      country,
    };

    try {
      const response = await axios.post(BASE_API_URL+'/add_address', postData);
      if (response.status === 200) {}
      setSnackbarMessage('Address added successfully!');
      setSnackbarSeverity('success');
      handleClose(); // Close the dialog on success
    } catch (error) {
      setSnackbarMessage('Failed to add address.');
      setSnackbarSeverity('error');
    }

    setSnackbarOpen(true);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { width: {
              xs: '100%',  // 80% width for mobile view
              sm: '30%'   // 30% width for larger screens
            }},
        }}
      >
        <Box 
          display="flex" 
          alignItems="center" 
          justifyContent="space-between" 
          p={1} 
          border={1} 
          borderColor="divider"
        >
          <span className='address-title'>ADD NEW ADDRESS</span>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent sx={{ overflow: 'hidden' }}>
          <Stack spacing={2}>
            {/* Contact Details */}
            <span className='address-subtitle'>CONTACT DETAILS</span>
            <TextField size="small" label="Name" variant="outlined" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
            <TextField size="small" label="Mobile No." variant="outlined" fullWidth value={mobile} onChange={(e) => setMobile(e.target.value)} />

            {/* Address Section */}
            <span className='address-subtitle'>ADDRESS</span>
            <TextField size="small" label="Pin Code" variant="outlined" fullWidth value={pincode} onChange={(e) => setPincode(e.target.value)} />
            <TextField size="small" label="Address (House No, Building, Street, Area)" variant="outlined" fullWidth value={address} onChange={(e) => setAddress(e.target.value)} />
            <TextField size="small" label="Locality / Town" variant="outlined" fullWidth value={city} onChange={(e) => setCity(e.target.value)} />

            <Stack direction="row" spacing={2}>
            <TextField size="small" label="State" variant="outlined" fullWidth value={state} onChange={(e) => setState(e.target.value)} />
              <TextField size="small" label="Country" variant="outlined" fullWidth value={country} onChange={(e) => setCountry(e.target.value)} />
            </Stack>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button mt={1} fullWidth onClick={handleSubmit} variant="contained" color="primary">
            Add Address
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for success/failure messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddAddress;
