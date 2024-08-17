import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ProductCard from './ProductCard';

function FeaturedProducts() {
  return (
    <div className="featured-products-section">
      <Grid item textAlign={'center'}>
        <span className="heading-1">Featured Products</span>
      </Grid>

      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Grid container spacing={4} justifyContent="space-between">
          {Array.from(Array(8).keys()).map((item) => (
            <Grid item md={3} key={item}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ProductCard />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default FeaturedProducts;
