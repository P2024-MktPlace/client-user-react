import { Box, Chip, Divider, Stack, Typography, Grid } from '@mui/material';
import OrderCard from './OrderCard';
import DownloadIcon from '@mui/icons-material/Download';
import React, { useRef } from 'react';
import Invoice from './Invoice';

const MyOrderProduct = ({ item }) => {
  const data = item.ordproducts;
  const invoiceRef = useRef(null);

  const handleDownloadInvoice = () => {
    invoiceRef.current.downloadPDF();
  };

  const bgColor = {
    delivered: '#abffae', // Light green
    pending: '#ffdba6', // Light orange
    cancelled: '#ffa7a1', // Light red
    intransit: '#91ceff', // Light blue
  };

  const textColor = {
    '#abffae': '#388e3c', // Dark green
    '#ffdba6': '#ff9800', // Dark orange
    '#ffa7a1': '#d32f2f', // Dark red
    '#91ceff': '#1976d2', // Dark blue
  };

  return (
    <div className="productBoxBorder">
      <Box>
        <Box>
          {/* Responsive padding */}
          <Grid container spacing={2} alignItems="center">
            {/* Order ID Section */}
            <Grid item xs={12} sm={6}>
              <Typography
                className="myorder-orderno"
                sx={{
                  textAlign: 'left',
                  wordWrap: 'break-word', // Prevents overflow issues
                }}
              >
                # {item.order_id}
              </Typography>
            </Grid>

            {/* Action Section */}
            <Grid item xs={12} sm={6}>
              <Stack
                direction="row" // Vertical stack on mobile
                spacing={1}
                justifyContent={{ xs: 'center', sm: 'flex-end' }} // Center-align on mobile, right-align on larger screens
                alignItems="center"
              >
                <Box>
                  <Chip
                    icon={<DownloadIcon />}
                    label="Invoice"
                    variant="outlined"
                    onClick={handleDownloadInvoice}
                    sx={{
                      p: 1,
                      fontSize: { xs: '12px', sm: '14px' },
                    }}
                  />
                </Box>
                <Box>
                  <Chip
                    label={` ● PENDING`}
                    sx={{
                      backgroundColor: bgColor,
                      color: textColor,
                      fontWeight: 'bold',
                      fontSize: { xs: '12px', sm: '14px' }, // Responsive size
                    }}
                  />
                </Box>
              </Stack>
            </Grid>
          </Grid>
          {/* Order Date Section */}
          <Box>
            <Typography
              variant="body2"
              className="order_info"
              sx={{
                textAlign: { xs: 'center', sm: 'left' },
                color: 'gray',
              }}
            >
              {item.longDate}
            </Typography>
          </Box>
        </Box>

        <Stack mt={2} p={2} spacing={2}>
          {data.map((product) => (
            <OrderCard item={product} />
          ))}
        </Stack>
        {/* Total Amount Section */}
        <Box
          mt={2}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            borderTop: '1px solid #e0e0e0', // Light gray top border
            paddingTop: 1, // Space above the border
            flexDirection: { xs: 'column', sm: 'row' }, // Vertical on mobile
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          <Typography
            variant="h6"
            className="myorder-orderno"
            sx={{ mb: { xs: 1, sm: 0 } }} // Margin for small screens
          >
            Total: Rs. {item.amount.toFixed(2)}/-
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default MyOrderProduct;
