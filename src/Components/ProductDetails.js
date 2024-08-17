import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { CCarousel, CCarouselItem, CImage } from '@coreui/react';
import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function ProductDetails() {
  console.log('Hello');

  const [quantity, setQuantity] = useState(1); // Default quantity is 1

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const carouselItems = [
    {
      src: 'https://www.giva.co/cdn/shop/files/PX007_pre_large.jpg',
      alt: 'slide 1',
    },
    {
      src: 'https://www.giva.co/cdn/shop/products/silver_couple.jpg',
      alt: 'slide 2',
    },
    {
      src: 'https://www.giva.co/cdn/shop/files/customisedsilver-min.jpg',
      alt: 'slide 3',
    },
    {
      src: 'https://www.giva.co/cdn/shop/files/Openfile_customisedcopy_5_5_5-min.jpg',
    },
  ];

  return (
    <div>
      <Grid container spacing={2}>
        <Grid className="product_image" item xs={5}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <CCarousel
              className="product-image-slide"
              controls
              transition="crossfade"
            >
              {carouselItems.map((item, index) => (
                <CCarouselItem key={index}>
                  <CImage
                    className="d-block w-100"
                    src={item.src}
                    alt={item.alt}
                  />
                </CCarouselItem>
              ))}
            </CCarousel>
          </Box>
        </Grid>

        <Grid className="product_details" item xs={7}>
          <Box mb={2}>
            <span className="prouct_title">
              The Lovestruck Couple Rose Gold Pendant With Link Chain
            </span>
            <span className="category">Chains</span>
          </Box>

          <Divider className="divider" component="div" role="presentation" />

          <Box sx={{ alignItems: 'center' }} mt={2}>
            <span className="product-price">MRP : ₹ 85,000</span>
            <span className="product-desc">Incl. of all taxes</span>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }} mb={2}>
            <Typography>Quantity: </Typography>
            <TextField
              id="outlined-basic"
              sx={{ m: 2, minWidth: '100px' }} // Added minWidth for better alignment
              select
              size="small"
              value={quantity}
              onChange={handleQuantityChange}
            >
              {[...Array(10).keys()].map((value) => (
                <MenuItem key={value + 1} value={value + 1}>
                  {value + 1}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Divider className="divider" component="div" role="presentation" />
          <Box>
            <Button
              sx={{ m: 2 }}
              className="button-vertical"
              variant="contained"
            >
              Add to Cart
            </Button>
            <Button
              sx={{ m: 2 }}
              className="button-vertical"
              variant="outlined"
              startIcon={<FavoriteBorderIcon />}
            >
              Add to wishlist
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Divider className="divider" component="div" role="presentation" />

      <Box mt={2}>
        <Grid item textAlign={'center'}>
          <span className="heading-1">About</span>
        </Grid>

        <Box m={2}>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>PRODUCT DESCRIPTION</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <b>The Inspiration:</b> Cherish love's glow with The Lovestruck
                Couple Golden Pendant and Link Chain a timeless symbol of
                devotion and unity that beautifully mirrors the connection
                between two hearts. <br />
                <br />
                <b>The Design:</b> This golden pendant features a heart outline
                encasing two names, offering the option to personalise it with
                two different names. Styling Tip: Style this with a sheath
                dress.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography>SHIPPING DETAILS</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <ul>
                  <li>Free express shipping</li>
                  <li>6-month warranty</li>
                  <li>
                    Please check the spelling before you confirm your order
                  </li>
                  <li>
                    Please cancel/modify your order within an hour (We get to
                    business immediately!)
                  </li>
                  <li>
                    We accept only prepaid orders for personalized jewellery
                  </li>
                  <li>
                    Your personalized jewellery will be dispatched within 2
                    weeks (by express shipping, paid by us!)
                  </li>
                  <li>
                    We will replace your order at no cost if the polish fades
                    within 180 days of purchase
                  </li>
                  <li>
                    We will be able to return/refund your order for personalized
                    jewellery only in case of damage during transit
                  </li>
                  <li>Shipping internationally to 20+ countries</li>
                  <li>
                    Brand owned and marketed by: Indiejewel Fashions Private
                    Limited, 3rd floor, Magnum Vista, Raghuvanahalli, Bangalore,
                    Karnataka - 560062
                  </li>
                </ul>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>

      <Box mt={2}>
        <Grid item textAlign={'center'}>
          <span className="heading-1">You may also like</span>
        </Grid>
      </Box>
    </div>
  );
}

export default ProductDetails;
