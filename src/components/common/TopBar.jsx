import { useState, memo } from 'react';

import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import MenuDrawerContents from './MenuDrawerContents';

function TopBar({text, isIntroPage, resetFunc}) {

const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);

  const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    backdropFilter: 'blur(24px)',
    border: '1px solid',
    borderColor: (theme.vars || theme).palette.divider,
    backgroundColor: theme.vars
      ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.45)`
      : alpha(theme.palette.background.default, 0.4),
    boxShadow: (theme.vars || theme).shadows[1],
    padding: '8px 12px',
  }));

  return (
    <>
      <AppBar 
        position="static" 
        enableColorOnDark 
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          my: '1.5vh',
          width: "75vw" 
        }}
      >
        <StyledToolbar variant="dense">
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, position: "absolute", left: 0, right: 0 }}>
            {text}
          </Typography>
          {!isIntroPage && 
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{zIndex: 1000}}
            onClick={() => resetFunc()}
          ><RefreshIcon /></IconButton>}
        </StyledToolbar>
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
        <MenuDrawerContents setMenuDrawerOpen={() => setMenuDrawerOpen()} isIntroPage={isIntroPage}/>
      </Drawer>
    </>
  );
}

export default memo(TopBar);