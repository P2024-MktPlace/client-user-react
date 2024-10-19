import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ReCAPTCHA from 'react-google-recaptcha';
import { auth } from './firebase'; // Import Firebase auth
import { signInWithEmailAndPassword } from 'firebase/auth';
import BASE_API_URL from '../config';
import Token from './TokenContext'; // Import Token management

const RECAPTCHA_SITE_KEY = '6LcFLy4qAAAAAHBYWsHCJY7ZLhaJIAadVki6gfD5'; // Replace with your reCAPTCHA site key
const API_URL = BASE_API_URL; // Replace with your API endpoint

const AuthModal = ({ open, onClose, onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');

  const handleAuth = async () => {
    if (!captchaValue) {
      alert('Please verify that you are not a robot.');
      return;
    }

    try {
      if (isSignUp) {
        const response = await fetch(`${API_URL}/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            phoneNumber,
            password,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          onClose(); // Close modal after successful sign-up
        } else {
          console.error('Error during sign-up:', response.statusText);
        }
      } else {
        // Sign in with Firebase
        await signInWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;

        if (user) {
          // Retrieve token from Firebase user
          const idToken = await user.getIdToken();

          // Verify token with your API
          const response = await fetch(`${API_URL}/signin`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              idToken,
            }),
          });

          const data = await response.json();

          if (response.ok) {
            if (data.status === 'FAILED') {
              alert('Username or password is incorrect.');
            } else {
              // Store the token using the Token management
              Token.setToken(idToken);
              onLoginSuccess(); // Notify parent component
              onClose(); // Close modal after successful sign-in
            }
          } else {
            console.error('Error:', response.statusText);
          }
        }
      }
    } catch (error) {
      console.error('Authentication Error:', error);
    }
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="auth-modal-title"
      aria-describedby="auth-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 350,
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 24,
          p: 3,
        }}
      >
        <Typography id="auth-modal-title" variant="h6" component="h2">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </Typography>



        <TextField
          margin="normal"
          required
          fullWidth
          label="Email Address"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{mt:1}}
        />
        {isSignUp && (
          <TextField
            margin="normal"
            required
            fullWidth
            label="Phone Number"
            autoComplete="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            sx={{mt:1}}
          />
        )}

      {isSignUp && (
        <TextField
        margin="normal"
        required
        fullWidth
        label="Full Name"
        autoComplete="name"
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{mt:1}}
      />
        )}


        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{mt:1}}
        />
       <Box sx={{display: 'flex', justifyContent: 'center', width: '100%' }} mt={1}>
        <ReCAPTCHA 
          sitekey={RECAPTCHA_SITE_KEY} 
          onChange={handleCaptchaChange} 
          // style={{ width: '100%' }} // Make the ReCAPTCHA component full width
          
        />
      </Box>

        <Button
          type="button"
          fullWidth
          variant="contained"
          onClick={handleAuth}
          sx={{mt:2}}
        >
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </Button>
        <Button
          type="button"
          fullWidth
          variant="text"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp
            ? 'Already have an account? Sign In'
            : "Don't have an account? Sign Up"}
        </Button>
      </Box>
    </Modal>
  );
};

export default AuthModal;
