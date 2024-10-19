import { Box, Chip, Divider, Stack, Typography, Grid } from '@mui/material';
import OrderCard from './OrderCard';
import DownloadIcon from '@mui/icons-material/Download';

const MyOrderProduct = ({ item }) => {
  const data = item.ordproducts;
  const statusColors = {
    delivered: '#abffae', // Light green
    pending: '#ffdba6', // Light orange
    cancelled: '#ffa7a1', // Light red
    intransit: '#91ceff', // Light blue
  };

  // Define the darker shades manually for each status
  const textColorMap = {
    '#abffae': '#388e3c', // Dark green
    '#ffdba6': '#ff9800', // Dark orange
    '#ffa7a1': '#d32f2f', // Dark red
    '#91ceff': '#1976d2', // Dark blue
  };

  return (
    <div className="productBoxBorder">
      <Box>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={6}>
            <Typography className="myorder-orderno">{item.order_id}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Stack
              direction="row"
              spacing={1}
              justifyContent="flex-end"
              alignItems="center"
            >
              <span className="order_info">VIEW DETAILS</span>
              <Chip
                icon={<DownloadIcon />}
                label="Invoice"
                variant="outlined"
                sx={{ p: 1 }}
                // onClick={handleClick}
              />
              <Chip
                label={' ● ' + 'PENDING'}
                sx={() => {
                  const bgColor = statusColors['pending'];
                  const textColor = textColorMap[bgColor] || 'black'; // Fallback to black if no match

                  return {
                    backgroundColor: bgColor,
                    color: textColor,
                    fontWeight: 'bold',
                  };
                }}
              />
            </Stack>
          </Grid>
        </Grid>

        <Box>
          <span className="order_info">ORDER PLACED: {item.longDate}</span>
        </Box>

        <Stack mt={2} spacing={2}>
          {data.map((item) => (
            <OrderCard item={item} />
          ))}
        </Stack>

        <Box
          mt={2}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            borderTop: '1px solid #e0e0e0', // Light grey top border
            paddingTop: 1, // Optional: Add padding after the border
          }}
        >
          <span className="myorder-orderno">
            Total: Rs. {item.amount.toFixed(2)}/-
          </span>
        </Box>
      </Box>
    </div>
  );
};

export default MyOrderProduct;
