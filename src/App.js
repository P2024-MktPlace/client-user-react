import './App.css';
import Stack from '@mui/material/Stack';
import ResponsiveAppBar from './Components/AppHeader';
import IntroSlider from './Components/IntoSlider';
import FeaturedProducts from './Components/FeaturedProducts';
import ProductCard from './Components/ProductCard';
import CategoryList from './Components/CategoriesList';
import About from './Components/About';

function App() {
  return (
    <div className="App">
      <Stack spacing={2}>
        <ResponsiveAppBar />
        <div className="main-body">
          <IntroSlider />
          <CategoryList />
          <FeaturedProducts />
        </div>
        <About />
      </Stack>
    </div>
  );
}

export default App;
