import './App.css';
import Stack from '@mui/material/Stack';
import { Route, Routes } from 'react-router-dom';
import ResponsiveAppBar from './Components/AppHeader';
import IntroSlider from './Components/IntoSlider';
import FeaturedProducts from './Components/FeaturedProducts';
import CategoryList from './Components/CategoriesList';
import About from './Components/About';
import ProductDetails from './Components/ProductDetails';

function App() {
  return (
    <div className="App">
      <Stack spacing={2}>
        <ResponsiveAppBar />
        <div className="main-body">
          <Routes>
            <Route
              path="/client-user-react/"
              element={
                <Stack spacing={2}>
                  <IntroSlider />
                  <CategoryList />
                  <FeaturedProducts />
                  <About />
                </Stack>
              }
            />
            <Route
              path="/client-user-react/product/:id"
              element={<ProductDetails />}
            />
          </Routes>
        </div>
      </Stack>
    </div>
  );
}

export default App;
