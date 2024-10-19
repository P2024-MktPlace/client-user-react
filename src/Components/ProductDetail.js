import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, FormControl, InputLabel, MenuItem, Grid, Select, Stack, Snackbar } from "@mui/material";
import BASE_API_URL from '../config';
import AuthModal from './AuthModal';

const ProductDetail = () => {
    const { id } = useParams(); // Get the `id` from the URL
    const [quantity, setQuantity] = useState(1); // Default quantity
    const [product, setProduct] = useState(null); // Initialize product state
    const [images, setImages] = useState([]);
    const [authModalOpen, setAuthModalOpen] = useState(false); // State for AuthModal
    const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar
    const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    // Fetch product details from the API
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(BASE_API_URL + `/get_product?${id}`);
                const data = await response.json();
                setProduct(data);
                const imageList = data.product_image_list.split(",");
                setImages(imageList);
                if (imageList.length > 0) {
                    setSelectedImage(imageList[0]); // Set the first image by default
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
    
        fetchProductDetails();
    }, [id]);

    const [selectedImage, setSelectedImage] = useState(images[0]);

    const handleChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleAddToCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setAuthModalOpen(true); // Open the AuthModal if the user is not logged in
        } else {
            try {
                const response = await fetch(BASE_API_URL + '/add_to_cart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Include token in the headers
                    },
                    body: JSON.stringify({
                        product_id: product.product_id,
                        quantity: quantity,
                        token: token,
                    })
                });

                if (response.ok) {
                    setSnackbarMessage('Product added to cart successfully!');
                    setSnackbarOpen(true); // Open the Snackbar on success
                } else {
                    setSnackbarMessage('Failed to add product to cart.');
                    setSnackbarOpen(true); // Open Snackbar with failure message
                }
            } catch (error) {
                console.error('Error adding product to cart:', error);
                setSnackbarMessage('An error occurred.');
                setSnackbarOpen(true);
            }
        }
    };

    const handleLoginSuccess = () => {
        // Update the userLoggedIn state and possibly close the auth modal
        setUserLoggedIn(true);
        setAuthModalOpen(false);
      };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    if (!product) return <p>Loading...</p>; // Show a loading message until product data is fetched

    return (
        <Box
            display="flex"
            flexDirection={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            width="100%"
            p={4}
        >
            {/* Image Gallery and Main Image */}
            <Grid container spacing={2} width={{ xs: '100%', md: '40%' }}>
                {/* Left Side: Image Thumbnails */}
                <Box mt={2} sx={{ display: 'flex', flexDirection: { xs: 'row', md: 'column' }, gap: 2 }}>
                    {images.map((image, index) => (
                        <Box
                            key={index}
                            sx={{
                                border: selectedImage === image ? '2px solid blue' : '1px solid gray',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                padding: '5px',
                                width: '80px',
                                height: '80px',
                                overflow: 'hidden',
                            }}
                            onClick={() => setSelectedImage(image)}
                        >
                            <img
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </Box>
                    ))}
                </Box>

                {/* Right Side: Main Image */}
                <Grid p={2}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: { xs: '100%', md: '400px' }, // Make responsive for xs and md
                            aspectRatio: '1 / 1', // Ensures 1:1 aspect ratio
                            overflow: 'hidden',
                            borderRadius: '10px',
                        }}
                    >
                        <img
                            src={selectedImage}
                            alt="Selected Product"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>

            {/* Product Details */}
            <Box width={{ xs: '100%', md: '60%' }}>
                <Stack spacing={3}>
                    <Box>
                        <span variant="h6" className='product-id'>
                            {product.product_id}
                        </span>
                        <span variant="h5" className='product-heading'>
                            {product.product_title}
                        </span>
                        
                        <span variant="h6" className='product-price'>
                            Rs. {product.price}/-
                        </span>
                        <span variant="h6" className='product-oprice'>
                            Rs. {product.oprice}/-
                        </span>
                    </Box>
                    <Box>
                        <span variant="body1" className='product-description'>
                            {product.product_description}
                        </span>
                    </Box>
                    <Box>
                        <FormControl sx={{ minWidth: '120px' }}>
                            <InputLabel>Quantity</InputLabel>
                            <Select
                                value={quantity}
                                onChange={handleChange}
                                label="Quantity"
                            >
                                {[...Array(11).keys()].map((num) => (
                                    <MenuItem key={num} value={num}>
                                        {num}
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

            <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} onLoginSuccess={handleLoginSuccess} />

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
