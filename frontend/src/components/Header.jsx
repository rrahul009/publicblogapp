 import React, { useState } from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useUser } from '../globalContext/UserContext';

const Header = () => {
  const { userName } = useUser();
  console.log("****",userName)

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'white' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h4" component="div" color={'black'}>
              Blog
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <NavLink to="/createpost" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="h6" color={'black'}>Create Blog</Typography>
            </NavLink>
            <NavLink to="/user" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="h6" color={'black'}> {userName}</Typography>
            </NavLink>
            <NavLink to="/logout" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="h6" color={'black'}>Logout</Typography>
            </NavLink>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
