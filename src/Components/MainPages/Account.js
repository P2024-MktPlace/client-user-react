import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa'; // FontAwesome Icons
import BASE_API_URL from '../../config';

function MyAccount() {
  const [userData, setUserData] = useState(null);

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${BASE_API_URL}/user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: token,
          }),
        });

        const data = await response.json(); // Wait for the JSON response

        console.log(data); // Log the full response data

        // If the response is an array and you're looking to set user data from the first element
        setUserData(data[0]); // Assuming the response is an array and you want the first user
        console.log('Hello');
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Box display="flex" justifyContent="center" width="100%">
      <Box
        sx={{
          display: 'flex',
          width: '100%', // Makes it responsive
          maxWidth: '1200px', // Maximum width of 1200px
          flexDirection: 'column',
        }}
      >
        <Box flexBasis="100%" p={2}>
          <span className="settings-heading">My Profile</span>
          <Divider sx={{ mt: 1, mb: 3 }} />

          {userData && (
            <Stack spacing={3}>
              {/* Display a message if both are unverified */}
              {!userData.isemailverified && !userData.isphoneverified && (
                <Typography variant="body2" color="error">
                  Both email and phone are not verified. Please verify your
                  account.
                </Typography>
              )}

              {/* Full Name */}
              <TextField
                fullWidth
                id="full_name"
                label="Full Name"
                defaultValue={userData.name}
                variant="outlined"
                disabled
              />

              {/* Email and Phone Section */}
              <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  defaultValue={userData.email}
                  variant="outlined"
                  disabled
                />
                <Button
                  variant="contained"
                  color="primary"
                  disabled={userData.isemailverified}
                  onClick={() => alert('Email verification logic here')}
                >
                  {userData.isemailverified ? <FaCheck /> : <FaTimes />} Verify
                </Button>
              </Box>

              <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
                <TextField
                  fullWidth
                  id="phone"
                  label="Phone number"
                  defaultValue={`+91 ${userData.phone}`}
                  variant="outlined"
                  disabled
                />
                <Button
                  variant="contained"
                  color="primary"
                  disabled={userData.isphoneverified}
                  onClick={() => alert('Phone verification logic here')}
                >
                  {userData.isphoneverified ? <FaCheck /> : <FaTimes />} Verify
                </Button>
              </Box>
            </Stack>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default MyAccount;
