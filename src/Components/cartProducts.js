import * as React from 'react';
import Box from '@mui/material/Box';

import { Button, Divider, Grid } from '@mui/material';

function cartDetails() {
  return (
    <div>
      <Box sx={{ width: 350 }} p={3} role="presentation">
        <span className="product_title">My cart</span>
      </Box>

      <Divider className="divider" component="div" role="presentation" />

      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <span>Subtotal</span>
          </Grid>
          <Grid item xs={4} textAlign={'end'}>
            <span>Rs. 150</span>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <span>Shipping charges</span>
          </Grid>
          <Grid item xs={4} textAlign={'end'}>
            <span>Rs. 150</span>
          </Grid>
        </Grid>
      </Box>

      <Divider className="divider" component="div" role="presentation" />

      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <span>Total</span>
          </Grid>
          <Grid item xs={4} textAlign={'end'}>
            <span>Rs. 300</span>
          </Grid>
        </Grid>
      </Box>

      <Divider className="divider" component="div" role="presentation" />

      <Box p={2} className="fullwidth">
        <Button variant="contained" className="fullwidth" disableElevation>
          Proceed to checkout
        </Button>
      </Box>
    </div>
  );
}

export default cartDetails;
