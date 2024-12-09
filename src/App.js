import './App.css';
import Stack from '@mui/material/Stack';
import { Route, Routes } from 'react-router-dom';
import ResponsiveAppBar from './Components/AppHeader';
import IntroSlider from './Components/IntoSlider';
import FeaturedProducts from './Components/FeaturedProducts';
import CategoryList from './Components/CategoriesList';
import About from './Components/About';
import { Box, CircularProgress, Typography } from '@mui/material';
import ProductDetail from './Components/ProductDetail';
import CartItem from './Components/CartItem';
import CheckoutPage from './Components/CheckoutPage';
import NewArrivals from './Components/NewArrivals';
import MyAccount from './Components/MainPages/Account';
import OrderStatus from './Components/MainPages/OrderStatus';
import MyOrders from './Components/MainPages/MyOrders';
import AllProducts from './Components/MainPages/AllProducts';
import CategoryPage from './Components/CategoryPage';
import { useState, useEffect } from 'react';
import BASE_API_URL from './config';

function App() {
  const [loading, setLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState(false); // To track the API status

  useEffect(() => {
    // Make the GET request
    const fetchData = async () => {
      try {
        const response = await fetch(BASE_API_URL);
        if (response.ok) {
          setApiStatus(true); // If response is OK (200)
        } else {
          setApiStatus(false); // If response is not OK
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setApiStatus(false); // Set to false if there's an error
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []);

  // Show loading page while fetching data
  if (loading) {
    return (
      <Box
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

  // If API response is OK, render the main content
  if (apiStatus) {
    return (
      <div className="App">
        <Stack spacing={0}>
          <ResponsiveAppBar />
          <Box>
            <Routes>
              <Route
                path="/"
                element={
                  <Stack spacing={2}>
                    <IntroSlider />
                    <CategoryList />
                    <FeaturedProducts />
                    <NewArrivals />
                    {/* <About /> */}
                  </Stack>
                }
              />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/profile" element={<MyAccount />} />
              <Route path="/order" element={<OrderStatus />} />
              <Route path="/myorders" element={<MyOrders />} />
              <Route path="/shop" element={<CategoryPage />} />
            </Routes>
          </Box>
        </Stack>
      </div>
    );
  }

  // If the API request failed or response is not OK
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        color: 'red',
      }}
    >
      <Typography variant="h6" color="error">
        Something went wrong. Please try again later.
      </Typography>
    </Box>
  );
}

export default App;
