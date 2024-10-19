import { Box, Chip, Paper, Stack } from '@mui/material';

const OrderCard = ({ item }) => {
  return (
    <Box mt={2}>
      <Paper
        sx={{
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* Image Section */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img
            src={item.product_image_list.split(',')[0]}
            //   alt={item.product_title}
            style={{
              borderTopLeftRadius: '10px',
              borderBottomLeftRadius: '10px',
              width: '120px',
              height: '120px',
              objectFit: 'cover', // Ensures the image covers the area without distortion
            }}
          />
        </Box>

        {/* Product Info Section */}
        <Box p={2}>
          <Stack spacing={1}>
            <span className="order_name">{item.product_name}</span>
            <Stack direction={'row'}>
              <Chip
                label="Write a product review"
                variant="outlined"
                sx={{ mr: 2, p: 1 }}
                // onClick={handleClick}
                p={2}
              />
              <Chip
                label="View Product"
                variant="outlined"
                sx={{ mr: 2, p: 1 }}
                // onClick={handleClick}
                p={2}
              />
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default OrderCard;
