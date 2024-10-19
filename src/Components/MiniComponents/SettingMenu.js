import { Box, List, ListItem, ListItemButton, ListItemIcon  } from "@mui/material";
import Typography from '@mui/material/Typography';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import React from "react";

const SettingMenu= ({activePage}) =>{

    const menuItems = [
        { label: 'Profile', value: 'profile', icon: <AccountCircleOutlinedIcon /> },
        { label: 'Orders', value: 'myorder', icon: <ShoppingBagOutlinedIcon /> }
      ];
      return (
        <Box
          sx={{
            width: '100%',
          }}
        >
          {/* <Typography variant="h6" sx={{ marginBottom: '32px', fontWeight: 'bold' }}>
            Good Morning,
            <br />
            George Gika
          </Typography> */}
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.value} disablePadding>
                <ListItemButton
                  sx={{
                    borderRadius: '15px',
                    marginBottom: '15px',
                    padding : '15px',
                    backgroundColor: activePage === item.value ? '#000' : '#f0f0f0',
                    color: activePage === item.value ? '#fff' : '#000',
                    '&:hover': {
                      backgroundColor: activePage === item.value ? '#000' : '#e0e0e0',
                    },
                  }}
                >
                <ListItemIcon
                sx={{ color: activePage === item.value ? '#fff' : '#000' }}
                >
                {React.cloneElement(item.icon, { fontSize: 'medium' })} 
                </ListItemIcon>
                <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                {item.label}
                </Typography>

                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      );
    };

export default SettingMenu;