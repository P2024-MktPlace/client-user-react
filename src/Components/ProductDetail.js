import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Grid,
  Select,
  Stack,
  Snackbar,
} from '@mui/material';
import BASE_API_URL from '../config';
import AuthModal from './AuthModal';

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${BASE_API_URL}/get_product?${id}`);
        const data = await response.json();
        setProduct(data);
        const imageList = data.product_image_list.split(',');
        setImages(imageList);
        if (imageList.length > 0) {
          setSelectedImage(imageList[0]);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setAuthModalOpen(true);
    } else {
      try {
        const response = await fetch(`${BASE_API_URL}/add_to_cart`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            product_id: product.product_id,
            quantity,
            token,
          }),
        });

        if (response.ok) {
          setSnackbarMessage('Product added to cart successfully!');
          setSnackbarOpen(true);
        } else {
          setSnackbarMessage('Failed to add product to cart.');
          setSnackbarOpen(true);
        }
      } catch (error) {
        console.error('Error adding product to cart:', error);
        setSnackbarMessage('An error occurred.');
        setSnackbarOpen(true);
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleLoginSuccess = () => {
    // Update the userLoggedIn state and possibly close the auth modal
    setUserLoggedIn(true);
    setAuthModalOpen(false);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'column', md: 'row' }}
      justifyContent="space-between"
      width="100%"
      p={3}
    >
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        width={{ xs: '100%', md: '43%' }}
      >
        <Box sx={{ width: { xs: '100%', md: '15%' } }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'row', md: 'column' },
                  gap: 2,
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  overflowX: { xs: 'auto', md: 'hidden' },
                  flexWrap: { xs: 'nowrap', md: 'wrap' },
                }}
              >
                {images.map((image, index) => (
                  <Box
                    m={1}
                    key={index}
                    sx={{
                      border:
                        selectedImage === image
                          ? '2px solid blue'
                          : '1px solid gray',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      padding: '5px',
                      height: { xs: '80px', md: 'auto' },
                      overflow: 'hidden',
                    }}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box p={1} sx={{ width: '100%' }}>
          <img
            src={selectedImage}
            alt="Selected Product"
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
          />
        </Box>
      </Box>

      {/* Product Details */}
      <Box p={1} width={{ xs: '100%', md: '52%' }}>
        <Stack spacing={3}>
          <Box>
            <span variant="h6" className="product-id">
              {product.product_id}
            </span>
            <span variant="h5" className="product-heading">
              {product.product_title}
            </span>
            {/* <span variant="h6" className="product-price">
              Rs. {product.price}/-
            </span>
            <span variant="h6" className="product-oprice">
              Rs. {product.oprice}/-
            </span> */}
          </Box>
          <Box>
            <div
              className="product-description"
              dangerouslySetInnerHTML={{ __html: product.product_description }}
            ></div>
          </Box>
          <Box>
            <FormControl sx={{ minWidth: '120px' }}>
              <InputLabel>Quantity</InputLabel>
              <Select value={quantity} onChange={handleChange} label="Quantity">
                {[...Array(5).keys()].map((num) => (
                  <MenuItem key={num + 1} value={num + 1}>
                    {num + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Button
            variant="contained"
            onClick={handleAddToCart}
            sx={{
              backgroundColor: 'black',
              color: 'white',
              borderRadius: '50px',
              padding: '12px 24px',
              fontSize: '16px',
              width: { xs: '100%', md: '200px' },
              '&:hover': {
                backgroundColor: 'darkgray',
              },
            }}
          >
            Add to Cart
          </Button>
        </Stack>
      </Box>

      <AuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Snackbar for success or error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default ProductDetail;
