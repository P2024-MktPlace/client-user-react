import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react';
import BASE_API_URL from '../config';
import FeaturedCard from './FeaturedCard';

function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(BASE_API_URL + '/featured_products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="featured-products-section">
      <Grid item xs={6} textAlign={'center'} mb={3}>
        <p className="heading-small">Featured</p>
        <p className="heading-medium">Products</p>
      </Grid>

      <Box
        sx={{
          flexGrow: 1,
          p: 2,

          margin: '0 auto', // Center the container horizontally
        }}
      >
        <Grid
          container
          rowSpacing={4} // Equal spacing between rows
          justifyContent={{ xs: 'center', md: 'space-between' }}
        >
          {products.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.id}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FeaturedCard item={item} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default FeaturedProducts;
