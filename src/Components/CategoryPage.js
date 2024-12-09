import {
  Box,
  Breadcrumbs,
  Divider,
  Grid,
  Link,
  Typography,
  Slider,
  Popover,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import React, { useState, useEffect } from 'react';
import BASE_API_URL from '../config';
import FeaturedCard from './FeaturedCard';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

function CategoryPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('q'); // Replace 'paramName' with your query parameter key

  const [products, setProducts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null); // For the Price popover
  const [priceRange, setPriceRange] = useState([0, 1000]); // Default price range [min, max]
  const [minPrice, setMinPrice] = useState(0); // Min price from API
  const [maxPrice, setMaxPrice] = useState(1000); // Max price from API
  const [sortOrder, setSortOrder] = useState('low-to-high'); // Sorting option (low-to-high or high-to-low)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          BASE_API_URL + '/get_products?category=' + category
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);

        // Calculate min and max price from the fetched data
        const prices = data.map((product) => product.price);
        setMinPrice(Math.min(...prices));
        setMaxPrice(Math.max(...prices));
        setPriceRange([Math.min(...prices), Math.max(...prices)]); // Set the default price range based on data
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Sort products based on the selected sort order
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === 'low-to-high') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  // Open/Close Popover for Price Filter
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // Update price range
  const handleSliderChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  return (
    <Box display="flex" justifyContent="center" width="100%">
      <Box
        m={4}
        sx={{
          display: 'flex',
          width: '100%',
          maxWidth: '1400px',
          flexDirection: 'column',
        }}
      >
        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none', // Optional, ensures no browser overrides
              }}
              color="inherit"
              fontSize={20}
              href="/"
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Home
            </Link>
            <Link
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
              fontSize={20}
            >
              <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              <Typography fontSize={20} sx={{ color: 'text.primary' }}>
                {category}
              </Typography>
            </Link>
          </Breadcrumbs>
          <Divider sx={{ mt: 1, mb: 3 }} />

          <Grid item xs={6} textAlign={'center'} mb={3}>
            <p className="heading-medium">{category}</p>
          </Grid>

          {/* Filter Section */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {/* Price Filter */}
            <Box>
              <Typography
                sx={{
                  fontSize: 18,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
                onClick={handlePopoverOpen}
              >
                Price
                <ArrowDropDownIcon sx={{ ml: 1 }} />
              </Typography>
              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Box sx={{ padding: 3, width: 500 }}>
                  <Typography variant="body1" gutterBottom>
                    Select Price Range:
                  </Typography>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                    }}
                  >
                    {/* Minimum Value */}
                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
                      Rs. {minPrice}
                    </span>

                    {/* Slider */}
                    <Slider
                      value={priceRange}
                      onChange={handleSliderChange}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(value) => `Rs. ${value}`}
                      min={minPrice}
                      max={maxPrice}
                      style={{ flex: 1 }}
                    />

                    {/* Maximum Value */}
                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
                      Rs. {maxPrice}
                    </span>
                  </div>
                </Box>
              </Popover>
            </Box>

            {/* Sort By Price */}
            <FormControl variant="outlined" sx={{ width: 250 }}>
              <InputLabel>Sort by</InputLabel>
              <Select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                label="Sort by"
              >
                <MenuItem value="low-to-high">Price: Low to High</MenuItem>
                <MenuItem value="high-to-low">Price: High to Low</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Divider sx={{ mt: 3, mb: 3 }} />

          <Box mt={3}>
            <Grid
              container
              rowSpacing={4}
              justifyContent={{ xs: 'center', md: 'space-between' }}
            >
              {sortedProducts
                .filter(
                  (item) =>
                    item.price >= priceRange[0] && item.price <= priceRange[1]
                )
                .map((item) => (
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
      </Box>
    </Box>
  );
}

export default CategoryPage;
