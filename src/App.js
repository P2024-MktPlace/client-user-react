import './App.css';
import Stack from '@mui/material/Stack';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import ResponsiveAppBar from './Components/AppHeader';
import IntroSlider from './Components/IntoSlider';
import FeaturedProducts from './Components/FeaturedProducts';
import CategoryList from './Components/CategoriesList';
import About from './Components/About';
import ProductDetails from './Components/ProductDetails';
import { Box } from '@mui/material';

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
                  {/* <About /> */}
                </Stack>
              }
            />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </Box>
      </Stack>
    </div>
  );
}

export default App;
