import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Box, ButtonBase, Grid, Stack } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import { useCart } from './CartContext'; // Import CartContext
// import { useAuth } from './AuthContext'; // Import AuthContext

const ProductCard = ({ item }) => {
  // const { addToCart } = useCart(); // Access the addToCart function from CartContext
  // const { userLoggedIn, openAuthModal } = useAuth(); // Access authentication status and modal function

  const discountAmount = (item.price * item.discount) / 100;
  const discountedPrice = item.price - discountAmount;

  // // Handler for opening the product page
  const openProduct = () => {
    window.location.href = `product/${item.id}`;
  };

  // // Handler for adding the product to the cart
  // const handleAddToCart = (event) => {
  //   event.stopPropagation(); // Prevents the event from bubbling up to the card

  //   if (!userLoggedIn) {
  //     openAuthModal(); // Open authentication modal if user is not logged in
  //   } else {
  //     addToCart(item); // Add item to cart if user is logged in
  //   }
  // };

  return (
    <Card
      variant="outlined"
      sx={{
        width: 250,
        '&:hover': {
          boxShadow: 'md',
          borderColor: 'neutral.outlinedHoverBorder',
        },
      }}
    >
      <img
        className="cardImage"
        src={
          item.image ||
          'https://kinclimg5.bluestone.com/f_webp,c_scale,w_176,b_rgb:f0f0f0/giproduct/BIDG0103R181_YAA18DIG6XXXXXXXX_ABCD00-PICS-00000-1024-27776.png'
        }
        srcSet={
          item.image ||
          'https://kinclimg5.bluestone.com/f_webp,c_scale,w_176,b_rgb:f0f0f0/giproduct/BIDG0103R181_YAA18DIG6XXXXXXXX_ABCD00-PICS-00000-1024-27776.png'
        }
        loading="lazy"
        alt=""
        onClick={openProduct} // Open product on image click
      />

      <Grid container sx={{ p: 1 }} alignItems="center">
        <Grid item xs={10}>
          <Box>
            <Typography>
              <span className="item-id">{item.product_id}</span>
              <span className="item-name">{item.product_title}</span>
              <span className="item-price">Rs. {item.price}/-</span>
              {item.discount > 0 && (
                <span className="item-discount">
                  <Typography variant="body2" color="textSecondary">
                    Discounted Price: Rs. {discountedPrice.toFixed(2)}/-
                  </Typography>
                </span>
              )}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box
            className="card-actions"
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%" // Ensure it takes the full height of the grid item
          >
            <Stack direction="column" alignItems="center">
              <Box display="flex" alignItems="center" mb={0.5}>
                <span className="item-price">4.5</span>
                <StarIcon sx={{ color: '#F4CE14', fontSize: 16, ml: 0.25 }} />
              </Box>

              <ButtonBase
                className="add-to-cart"
                //onClick={handleAddToCart} // Updated click handler
                sx={{
                  padding: '4px', // Adjust padding here
                  borderRadius: '5px', // Match with CSS if needed
                  border: '1px solid #666666', // Match with CSS if needed
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.3s',
                  '&:hover': {
                    backgroundColor: '#f0f0f0', // Light background color on hover
                  },
                }}
              >
                <ShoppingCartIcon />
              </ButtonBase>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProductCard;
