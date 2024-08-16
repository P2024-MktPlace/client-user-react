import Box from '@mui/material/Box';
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import Autocomplete from '@mui/material/Autocomplete';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha('#000000', 0.05), // Change the background color here
  '&:hover': {
    backgroundColor: alpha('#000000', 0.07), // Change the hover background color here
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: '50%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

// Custom styling to hide the scrollbar
const StyledAutocomplete = styled(Autocomplete)({
  '& .MuiAutocomplete-listbox': {
    scrollbarWidth: 'none', // Firefox
    '&::-webkit-scrollbar': {
      display: 'none', // WebKit browsers
    },
  },
});

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
];

function ResponsiveAppBar() {
  const [inputValue, setInputValue] = useState('');

  return (
    <div position="static" className="app-bar">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={4}>
            <img
              className="logo"
              src={'https://dummyimage.com/150x75/b0000/fff'}
              loading="lazy"
            />
          </Grid>
          <Grid item xs={8}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              spacing={2}
            >
              <Search>
                <StyledAutocomplete
                  freeSolo
                  disableClearable
                  options={
                    inputValue ? top100Films.map((option) => option.title) : []
                  }
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  renderInput={(params) => (
                    <StyledInputBase
                      {...params.InputProps}
                      placeholder="Search…"
                      inputProps={{
                        ...params.inputProps,
                        'aria-label': 'search',
                      }}
                    />
                  )}
                />
              </Search>

              <IconButton size="large" color="inherit">
                <SearchIcon />
              </IconButton>

              <IconButton
                size="medium"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default ResponsiveAppBar;
