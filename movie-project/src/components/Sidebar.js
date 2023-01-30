import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, useMediaQuery, Typography, Box, Grid } from '@mui/material';
import { Menu } from '@mui/icons-material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined'

const MySidebar = () => {
  const [isOpen, setOpen] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:1000px)');

  const toggleDrawer = (open) => (event) => {
    setOpen(open);
  };

  return (
    <>
      <IconButton onClick={toggleDrawer(true)}>
        <Menu />
      </IconButton>
      <Drawer anchor='left' variant={isSmallScreen ? 'temporary' : 'permanent'} open={isOpen} onClose={toggleDrawer(false)} sx={{
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '15vw' },
      }}>
        <Typography textAlign={'center'} variant='h6'>Movies</Typography>
        <Box height="100%" display="flex" marginBottom={'100px'} flexDirection="column" alignItems={'center'} justifyContent={isSmallScreen ? 'flex-start' : 'flex-end'}>
          <List>
            <ListItem>
              <ListItemIcon>
                <HomeOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ExploreOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Discover" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};
export default MySidebar