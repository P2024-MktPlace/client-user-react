import {
  Box,
  Button,
  Chip,
  Divider,
  Modal,
  Stack,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

const OrderCard = ({ item }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const viewProduct = () => {
    navigate(`/product/id=${item.product_id}`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        width: '100%',
      }}
    >
      {/* Image Section - 30% */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '5px',
          width: { xs: '100%', sm: '120px' }, // 100% on mobile, 30% on larger screens
          height: '120px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <img
          src={item.product_image_list.split(',')[0]}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        {/* Circle with Quantity */}
        <Box
          sx={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            width: '25px',
            height: '25px',
            paddingBottom: '2px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
          }}
        >
          {item.product_quantity}
        </Box>
      </Box>

      {/* Product Info Section - 50% */}
      <Box
        p={{ xs: 1, sm: 2 }}
        sx={{ width: { xs: '100%', sm: '60%' } }} // 100% on mobile, 50% on larger screens
      >
        <Stack spacing={1}>
          <span className="order_prodid">SKU : {item.product_id}</span>
          <span className="order_name">{item.product_name}</span>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            {/* <Chip
              label="Write a product review"
              variant="outlined"
              sx={{ p: 1, fontSize: { xs: '12px', sm: '14px' }, mr: { sm: 2 },
              }}
            /> */}
            <Chip
              label="View Product"
              variant="outlined"
              sx={{
                p: 1,
                fontSize: { xs: '12px', sm: '14px' },
                mr: { sm: 2 },
              }}
              onClick={viewProduct}
            />
          </Stack>
        </Stack>
      </Box>

      {/* Additional Information Section - 20% */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'top',
          justifyContent: 'right',
          width: { xs: '100%', sm: '25%' }, // 100% on mobile, 20% on larger screens
          p: 2,
        }}
      >
        <Stack spacing={1} width={'100%'}>
          <Chip
            label="Track Package"
            variant="outlined"
            onClick={handleOpen}
            sx={{
              p: 2,
              fontSize: '14px',
            }}
          />

          {/* <Chip
            label="Get product Support"
            variant="outlined"
            sx={{
              p: 2,
              fontSize: '14px',
              backgroundColor: '#FFA500', // Orangish-yellow color
              borderColor: '#FFA500',
              color: 'black', // Text color for readability
              '&:hover': {
                backgroundColor: '#FFB732', // Slightly lighter shade on hover
              },
            }}
          /> */}
        </Stack>
      </Box>

      {/* Modal Component */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Track Order
          </Typography>
          <Divider />
          <Box>
            <Box p={1}>
              <span className="ship-info">Delivery Service : Indian Post</span>
              <span className="ship-info">In Transit</span>
              <span className="ship-info">Estimated date of Delivery</span>
            </Box>
            <Divider />
            <Box mt={1}>
              <span className="order_name">Timeline History</span>

              <Timeline
                sx={{
                  [`& .${timelineItemClasses.root}:before`]: {
                    flex: 0,
                    padding: 1,
                    marginTop: 1,
                  },
                }}
              >
                <Timeline>
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        Time date time
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'gray' }}>
                        product_description
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot />
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        Time date time
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'gray' }}>
                        product_description
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                </Timeline>
              </Timeline>
            </Box>
          </Box>
          <Button onClick={handleClose} variant="contained">
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default OrderCard;
