import { Box } from '@mui/material';

const AllProducts = () => {
  return (
    <Box
      display="flex"
      justifyContent="center" // Center the content
      width="100%"
      p={2}
    >
      <Box
        sx={{
          display: 'flex',
          maxWidth: '1400px', // Set a maximum width for the container
          width: '70%', // Full width up to the max width
        }}
      >
        Hello
      </Box>
    </Box>
  );
};

export default AllProducts;
