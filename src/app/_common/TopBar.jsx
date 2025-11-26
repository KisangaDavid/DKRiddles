'use client'

import { useState, memo } from 'react';
import { useTheme } from '@mui/material/styles';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import MenuDrawerContents from './MenuDrawerContents';

function TopBar({text, isPuzzlePage, resetFunc}) {

  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);
  const theme = useTheme();

  return (
    <>
      <AppBar 
        position="static" 
        enableColorOnDark 
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          color: 'rgba(255, 255, 255, 1)',
          backgroundImage: 'none',
          my: '1.5vh',
          width: "98.5%" 
        }}
      >
        <Toolbar variant="dense"
          sx = {{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
            backdropFilter: 'blur(24px)',
            border: '1px solid',
            borderColor: (theme.vars || theme).palette.divider,
            backgroundColor: `rgba(5, 7, 10, 0.45)`,
            boxShadow: 'hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px',
            padding: '8px 12px',
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ zIndex: 1000 }}
            onClick={() => setMenuDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, left: 0, right: 0 }}>
            {text}
          </Typography>
          {isPuzzlePage && 
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{zIndex: 1000}}
            onClick={() => resetFunc()}
          ><RefreshIcon /></IconButton>}
        </Toolbar>
      </AppBar>
      <Drawer 
        open={menuDrawerOpen} 
        onClose={() => setMenuDrawerOpen(false)}
        aria-hidden={false}
        slotProps={{
          paper: {
            sx: { 
              backgroundImage: 'radial-gradient(ellipse 100% 150% at 160% 50%, hsl(210, 100%, 16%), hsla(210, 95.00%, 6.80%, 0.64))' 
            }
          }
        }}>
        <MenuDrawerContents setMenuDrawerOpen={() => setMenuDrawerOpen()}/>
      </Drawer>
    </>
  );
}

export default memo(TopBar);