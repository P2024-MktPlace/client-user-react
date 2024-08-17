import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function ProductCard() {
  return (
    <Box>
      <Card variant="outlined" className="productCard">
        <React.Fragment>
          <CardContent>
            <img
              className="cardImage"
              src="https://dummyimage.com/500x500/yg776cc/fff"
            />

            <Typography>₹ 85,000</Typography>
            {/* <Typography
              color="text.secondary"
              sx={{ textDecoration: 'line-through' }}
              fontSize={11}
            >
              ₹ 85,000
            </Typography> */}
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Category
            </Typography>
            <Typography component="div">Title of the Image</Typography>
          </CardContent>
          {/* <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions> */}
        </React.Fragment>
      </Card>
    </Box>
  );
}

export default ProductCard;
