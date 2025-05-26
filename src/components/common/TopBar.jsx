import { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import MenuDrawerContents from './MenuDrawerContents';

function TopBar({text, isHomePage}) {

  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);

  return (
    <Box sx={{width: "100%", mb: "5vh", position: "relative"}}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, zIndex: 1000 }}
            onClick={() => setMenuDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, position: "absolute", left: 0, right: 0 }}>
            {text}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={menuDrawerOpen} onClose={() => setMenuDrawerOpen(false)}>
        <MenuDrawerContents setMenuDrawerOpen={() => setMenuDrawerOpen()} isHomePage={isHomePage}/>
      </Drawer>
    </Box>
  );
}

export default TopBar;