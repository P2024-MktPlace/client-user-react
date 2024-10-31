import { Box, Stack, ButtonBase } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FeaturedCard = ({ item }) => {
  const [thumbnail, setThumbnail] = useState('');

  useEffect(() => {
    setThumbnail(item.product_image_list.split(',')[0]); // Select first image
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
          borderRadius: 1,
          overflow: 'hidden',
        }}
      >
        <Stack p={1}>
          <Box>
            <Box
              sx={{
                width: { xs: '90vw', md: 300 }, // Full width on mobile, 400px on desktop
                height: { xs: '90vw', md: 300 }, // Maintain square aspect ratio
                overflow: 'hidden',
              }}
            >
              <img
                src={thumbnail}
                alt={item.product_title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover', // Ensures the image covers the container properly
                }}
              />
            </Box>
          </Box>
        </Stack>
      </ButtonBase>
    </Box>
  );
};

export default FeaturedCard;
