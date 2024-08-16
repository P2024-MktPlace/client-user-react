import { span } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function About() {
  return (
    <div className="about">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <span className="about-heading">Delivery Information</span>
          <span className="about-heading">Shipping</span>
          <span className="about-heading">Payment Options</span>
          <span className="about-heading">Track your order</span>
          <span className="about-heading">Returns</span>
        </Grid>
        <Grid item xs={8}>
          <span className="about-heading">Write to US</span>
          <span className="about-heading">Offers</span>
          <span className="about-heading">Help and FAQ</span>
          <span className="about-heading">About US</span>
          <span className="about-heading">Phone no : +91 00000 00000</span>
        </Grid>
      </Grid>
    </div>
  );
}

export default About;
