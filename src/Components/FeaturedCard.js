import { Box, Stack, ButtonBase } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FeaturedCard = ({ item }) => {
  const [thumbnail, setThumbnail] = useState('');

  useEffect(() => {
    setThumbnail(item.product_image_list);
  }, [item.product_image_list]);

  return (
    <Box>
      <ButtonBase
        component={Link}
        to={`/product/id=${item.product_id}`}
        sx={{
          width: '100%',
          display: 'block',
          textAlign: 'left',
          borderRadius: 1, // adds a slight rounding to the card corners
          overflow: 'hidden',
        }}
      >
        <Stack spacing={1}>
          <Box p={2}>
            <Box mb={1}>
              <img
                width={200}
                height={200}
                src={item.product_image_list.split(',')[0]}
                style={{ borderRadius: '8px' }}
                alt={item.product_title}
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}
            >
              <span className="featured-product-category">{item.category}</span>
              <Box
                sx={{
                  width: '10px',
                  height: '15px',
                  ml: 1,
                }}
              />
              <span className="featured-product-rating">4.9</span>
            </Box>
            <span className="featured-product-title">{item.product_title}</span>
            <Box>
              <span className="featured-product-price">₹ {item.price}</span>
            </Box>
          </Box>
        </Stack>
      </ButtonBase>
    </Box>
  );
};

export default FeaturedCard;
