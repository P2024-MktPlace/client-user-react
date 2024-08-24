import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Breadcrumbs,
  Button,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { CCarousel, CCarouselItem, CImage } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from '@mui/material/Link';

function ProductDetails() {
  console.log('Hello');

  const [item, setItem] = useState([]);
  console.log('Loading featured prod');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          'https://jobnotification-4ecf7-default-rtdb.firebaseio.com/product.json'
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setItem(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const [quantity, setQuantity] = useState(1); // Default quantity is 1

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  // const carouselItems = productImages.map((url, index) => ({
  //   src: url,
  //   alt: `slide ${index + 1}`,
  // }));

  return (
    <div>
      <Box mb={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            {item.category}
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/material-ui/getting-started/installation/"
          >
            {item.sub_category}
          </Link>
        </Breadcrumbs>
      </Box>
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
              <CCarouselItem>
                <CImage
                  className="d-block w-100"
                  src="https://dummyimage.com/500x600/ffff00/000"
                  alt="https://dummyimage.com/500x600/ffff00/000"
                />
              </CCarouselItem>
            </CCarousel>
          </Box>
        </Grid>

        <Grid className="product_details" item xs={7}>
          <Box mb={2}>
            <span className="product_id">{item.product_id}</span>
            <span className="product_title">{item.product_title}</span>
          </Box>

          <Divider className="divider" component="div" role="presentation" />

          <Box sx={{ alignItems: 'center' }} mt={2}>
            <span className="product_description">
              {item.product_description}
            </span>
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

          <Box mt={2}>
            <Button variant="contained">Add to cart</Button>
          </Box>
        </Grid>
      </Grid>

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
