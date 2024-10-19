import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import { Box, Stack, ButtonBase, useTheme, useMediaQuery } from '@mui/material';
import BASE_API_URL from '../config';

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(BASE_API_URL + '/get_categories'); // Replace with your actual API endpoint
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Box p={isMobile ? 2 : 3}>
      <div className="categoriesList">
        <Grid item xs={6} textAlign={'center'} mb={3}>
          <p className="heading-small">Shop by</p>
          <p className="heading-medium">Category</p>
        </Grid>

        <Box sx={{ flexGrow: 1, p: 1 }}>
          <Grid
            container
            spacing={isMobile ? 4 : 5} // Adjust spacing based on mobile or larger screens
            justifyContent="center" // Center items in the grid
            alignItems="center" // Align items in the center vertically
          >
            {categories.map((category) => (
              <Grid
                item
                xs={6}
                sm={5}
                md={2}
                key={category.id}
                sx={{ marginBottom: isMobile ? 2 : 3 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ButtonBase
                    href={
                      '/shop?q=' +
                      category.category.toLowerCase().replace(/\s+/g, '_')
                    } // Replace `#` with your actual redirect link
                    sx={{
                      width: '100%',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      display: 'block',
                      cursor: 'pointer',
                    }}
                  >
                    <img
                      className="cardImage"
                      src={category.category_thumbnail}
                      alt={category.category}
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </ButtonBase>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </Box>
  );
}

export default CategoryList;
