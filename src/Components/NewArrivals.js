import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ProductCard from './ProductCard';
import React, { useState, useEffect } from 'react';
import BASE_API_URL from '../config';
import FeaturedCard from './FeaturedCard';

function NewArrivals() {
  const [products, setProducts] = useState([]);
  console.log('Loading featured prod');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(BASE_API_URL + '/all_products');
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
      <Grid item xs={6} textAlign={'center'} mb={3}>
        <p className="heading-small">New</p>
        <p className="heading-medium">Arrivals</p>
      </Grid>

      <Box
        sx={{
          flexGrow: 1,
          p: 2,
          maxWidth: '85%', // Set max width to 70% of the screen
          margin: '0 auto', // Center the box horizontally
        }}
      >
        <Grid
          container
          spacing={4}
          justifyContent={{ xs: 'center', md: 'space-between' }} // Center items on mobile
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

export default NewArrivals;
