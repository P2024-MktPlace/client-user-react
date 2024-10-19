import './App.css';
import Stack from '@mui/material/Stack';
import { Route, Routes } from 'react-router-dom';
import ResponsiveAppBar from './Components/AppHeader';
import IntroSlider from './Components/IntoSlider';
import FeaturedProducts from './Components/FeaturedProducts';
import CategoryList from './Components/CategoriesList';
import About from './Components/About';
import { Box } from '@mui/material';
import ProductDetail from './Components/ProductDetail';
import CartItem from './Components/CartItem';
import CheckoutPage from './Components/CheckoutPage';
import NewArrivals from './Components/NewArrivals';
import MyAccount from './Components/MainPages/Account';
import OrderStatus from './Components/MainPages/OrderStatus';
import MyOrders from './Components/MainPages/MyOrders';

function App() {
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
            {/* <Route path="/profile" element={<MyAccount />} /> */}
            <Route path="/order" element={<OrderStatus />} />
            <Route path="/myorders" element={<MyOrders />} />
          </Routes>
        </Box>
      </Stack>
    </div>
  );
}

export default App;
