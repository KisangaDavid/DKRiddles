'use client';

import { useState, memo, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import RefreshIcon from '@mui/icons-material/Refresh';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import MenuDrawerContents from './MenuDrawerContents';
import { SS_PFP_URL } from './constants';
import Avatar from '@mui/material/Avatar';
import { useRouter } from 'next/navigation';

interface Props {
  text: string;
  isPuzzlePage: boolean;
  resetFunc: (() => void) | undefined;
}

function TopBar({ text, isPuzzlePage, resetFunc }: Props) {
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);
  const [pfpUrl, setPfpUrl] = useState<string | null>(null);

  const theme = useTheme();
  const router = useRouter();

  useEffect(() => {
    setPfpUrl(sessionStorage.getItem(SS_PFP_URL));
  }, []);

  const handleAvatarClick = () => {
    router.push('/profile');
  };

  console.log('dat stuff outside the use effect: ' + pfpUrl);

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
          width: '98.5%',
        }}
      >
        <Toolbar
          variant="dense"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            borderRadius: `calc(${theme?.shape?.borderRadius || 4}px + 8px)`,
            backdropFilter: 'blur(24px)',
            border: '1px solid',
            borderColor:
              theme?.palette?.divider || 'rgba(255, 255, 255, 0.12)',
            backgroundColor: 'rgba(5, 7, 10, 0.45)',
            boxShadow:
              'hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px',
            padding: '8px 12px',
          }}
        >
          {/* Left side */}
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

          {/* Title */}
          <Typography
            variant="h6"
            component="div"
            sx={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
          >
            {text}
          </Typography>

          {/* Right side buttons */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: 'auto',
            }}
          >
            <IconButton
              size="small"
              color="inherit"
              aria-label="refresh"
              sx={{
                zIndex: 1000,
                visibility: isPuzzlePage ? 'visible' : 'hidden',
              }}
              onClick={resetFunc}
            >
              <RefreshIcon />
            </IconButton>

            {pfpUrl && (
              <IconButton
                size="medium"
                aria-label="profile"
                onClick={handleAvatarClick}
              >
                <Avatar
                  alt="User Profile"
                  src={pfpUrl}
                  sx={{
                    '&:hover': {
                      cursor: 'pointer',
                      backgroundColor: 'action.hover',
                    },
                  }}
                />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        open={menuDrawerOpen}
        onClose={() => setMenuDrawerOpen(false)}
        aria-hidden={false}
        slotProps={{
          paper: {
            sx: {
              backgroundImage:
                'radial-gradient(ellipse 100% 150% at 160% 50%, hsl(210, 100%, 16%), hsla(210, 95.00%, 6.80%, 0.64))',
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            },
          },
        }}
      >
        <MenuDrawerContents
          setMenuDrawerOpen={setMenuDrawerOpen}
        />
      </Drawer>
    </>
  );
}

export default TopBar;