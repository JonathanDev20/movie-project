import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItem, ListItemIcon, useMediaQuery, Typography, Box } from '@mui/material';
import { Menu } from '@mui/icons-material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined'
import { NavLink } from 'react-router-dom'
import '../App.css'

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
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: isSmallScreen ? '180px' : '15vw' },
      }}>
        <Typography textAlign={'center'} variant='h6'>Movies</Typography>
        <Box height="100%" display="flex" marginBottom={'100px'} flexDirection="column" alignItems={'center'} justifyContent={isSmallScreen ? 'flex-start' : 'flex-end'}>
          <List>
            <NavLink to={'/'} className='navigation'>
              <ListItem>
                <ListItemIcon>
                  <HomeOutlinedIcon />
                </ListItemIcon>
                <Typography className='link'>Home</Typography>
              </ListItem>
            </NavLink>
            <NavLink className='navigation' to={'/discover'}>
              <ListItem>
                <ListItemIcon>
                  <ExploreOutlinedIcon />
                </ListItemIcon>
                <Typography className='link'>Discover</Typography>
              </ListItem>
            </NavLink>
          </List>
        </Box>
      </Drawer>
    </>
  );
};
export default MySidebar