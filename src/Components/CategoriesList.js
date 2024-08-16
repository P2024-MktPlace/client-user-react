import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function CategoryList() {
  return (
    <div className="categoriesList">
      <Grid item xs={6} textAlign={'center'}>
        <p className="heading-small">Shop by</p>
        <p className="heading-medium">Category</p>
      </Grid>

      <Box sx={{ flexGrow: 6, p: 1 }}>
        <Grid container spacing={1} justifyContent="space-between">
          {Array.from(Array(6).keys()).map((item) => (
            <Grid item xs={6} sm={5} md={1.7} key={item}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box>
                  <img
                    className="cardImage"
                    src="https://dummyimage.com/200x200/1a5b9c/fff"
                    alt={`Card ${item + 1}`}
                  />
                  <Grid textAlign={'center'}>
                    <Typography>category_type</Typography>
                    <Typography fontSize={10}>Starting from ₹ 12000</Typography>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default CategoryList;
