import { Box, Stack, useTheme, useMediaQuery } from '@mui/material';

function InfoDetails1() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      <Stack
        direction={isMobile ? 'column' : 'row'}
        spacing={isMobile ? 2 : 10} // Adjust spacing based on screen size
        alignItems="center"
        justifyContent="center"
        m={isMobile ? 2 : 5} // Adjust margin based on screen size
      >
        <Box>
          <div className="infobox"></div>
        </Box>
        <Box>
          <div className="infobox"></div>
        </Box>
        <Box>
          <div className="infobox"></div>
        </Box>
        <Box>
          <div className="infobox"></div>
        </Box>
      </Stack>
    </div>
  );
}

export default InfoDetails1;
