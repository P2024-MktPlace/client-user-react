import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ProductCard from './ProductCard';
import React, { useState, useEffect } from 'react';

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  console.log('Loading featured prod');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          'https://jobnotification-4ecf7-default-rtdb.firebaseio.com/products.json'
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="featured-products-section">
      <Grid item textAlign={'center'}>
        <span className="heading-1">Featured Products</span>
      </Grid>

      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Grid container spacing={4} justifyContent="space-between">
          {products.map((item) => (
            <Grid item md={3} key={item.id}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ProductCard item={item} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default FeaturedProducts;
