import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import InfoDetails1 from './InfoOne';
import { Box, Stack, ButtonBase, useTheme, useMediaQuery } from '@mui/material';

function CategoryList() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box p={isMobile ? 2 : 3}>
      <div className="categoriesList">
        {/* <InfoDetails1 /> */}
        <Grid item xs={6} textAlign={'center'} mb={3}>
          <p className="heading-small">Shop by</p>
          <p className="heading-medium">Category</p>
        </Grid>

        <Box sx={{ flexGrow: 6, p: 1 }}>
          <Grid
            container
            spacing={isMobile ? 3 : 1}
            justifyContent="space-between"
          >
            {Array.from(Array(6).keys()).map((item) => (
              <Grid item xs={6} sm={5} md={1.7} key={item}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ButtonBase
                    href={`#`} // Replace `#` with your actual redirect link
                    sx={{
                      width: '100%',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      display: 'block',
                      cursor: 'pointer',
                    }}
                  >
                    <img
                      className="cardImage"
                      src="https://dummyimage.com/200x200/F0EBE3/fff"
                      alt={`Card ${item + 1}`}
                      style={{ width: '100%', height: 'auto' }}
                    />
                    <Grid textAlign={'center'}>
                      {/* Placeholder for any additional content (e.g., title, description) */}
                    </Grid>
                  </ButtonBase>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </Box>
  );
}

export default CategoryList;
