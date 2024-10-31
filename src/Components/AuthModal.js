import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  LinearProgress,
  Stack,
} from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import BASE_API_URL from '../config';
import Token from './TokenContext';

const RECAPTCHA_SITE_KEY = '6LcFLy4qAAAAAHBYWsHCJY7ZLhaJIAadVki6gfD5';

const AuthModal = ({ open, onClose, onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });

  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const closeSnackbar = () =>
    setSnackbar({ open: false, message: '', severity: 'info' });

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhoneNumber('');
    setPassword('');
    setCaptchaValue('');
  };

  const handleAuth = async () => {
    if (!captchaValue) {
      showSnackbar('Please verify that you are not a robot.', 'warning');
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        const response = await fetch(`${BASE_API_URL}/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, phoneNumber, password }),
        });

        if (response.ok) {
          showSnackbar('Sign-up successful! Please log in.', 'success');
          resetForm();
          setIsSignUp(false);
        } else {
          showSnackbar('Error during sign-up. Please try again.', 'error');
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;

        if (user) {
          const idToken = await user.getIdToken();
          const response = await fetch(`${BASE_API_URL}/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, idToken }),
          });

          const data = await response.json();

          if (response.ok && data.status !== 'FAILED') {
            Token.setToken(idToken);
            showSnackbar('Sign-in successful!', 'success');
            onLoginSuccess();
            resetForm();
            onClose();
          } else {
            showSnackbar('Invalid credentials. Please try again.', 'error');
          }
        }
      }
    } catch (error) {
      showSnackbar(`Authentication Error: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCaptchaChange = (value) => setCaptchaValue(value);

  return (
    <>
      <Modal open={open} onClose={onClose} aria-labelledby="auth-modal-title">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          {loading && <LinearProgress sx={{ mb: 2 }} />}

          <Typography
            id="auth-modal-title"
            variant="h5"
            textAlign="center"
            mb={2}
          >
            {isSignUp ? 'Create an Account' : 'Welcome Back'}
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />

            {isSignUp && (
              <TextField
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
              />
            )}

            {isSignUp && (
              <TextField
                label="Phone Number"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                fullWidth
                required
              />
            )}

            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />

            <Box display="flex" justifyContent="center" mt={1}>
              <ReCAPTCHA
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={handleCaptchaChange}
              />
            </Box>

            <Button
              variant="contained"
              fullWidth
              onClick={handleAuth}
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>

            <Button
              variant="text"
              fullWidth
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp
                ? 'Already have an account? Sign In'
                : "Don't have an account? Sign Up"}
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AuthModal;
