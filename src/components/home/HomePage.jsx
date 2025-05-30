import { useState, useEffect } from 'react'

import { styled } from '@mui/material/styles';
import Rat from '/src/assets/rat.svg';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import TopBar from '/src/components/common/TopBar.jsx';


function HomePage() {

  const SyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    height: '100%',
    backgroundColor: (theme.vars || theme).palette.background.paper,
    '&:hover': {
      backgroundColor: 'transparent',
      cursor: 'pointer',
    },
    '&:focus-visible': {
      outline: '3px solid',
      outlineColor: 'hsla(210, 98%, 48%, 0.5)',
      outlineOffset: '2px',
    },
  }));

  const SyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

  return (
    <Box sx={{
      display:"flex",
      flexDirection: 'column',
      alignItems: "center",
      height: "100vh",
      width: "100vw",
      overflow: "hidden",
      backgroundImage:'radial-gradient(ellipse 80% 50% at 50% -15%, hsl(210, 100%, 16%), hsla(208, 100.00%, 3.70%, 0.64))',
    }}>
      <TopBar text="Home Page" isHomePage={true} />
      WIP. Currently only the hiding rat riddle is done - go check it out using the dropdown menu on the top left.
            <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, md: 6 }}>
          <SyledCard
            variant="outlined"
            tabIndex={0}
          > 
              <CardMedia
              component="img"
              alt="green iguana"
              image={Rat}
              sx={{
                aspectRatio: '16 / 9',
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            />
              <SyledCardContent>
              <Typography gutterBottom variant="caption" component="div">
                tag 1
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                title 1
              </Typography>
              <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                description 1
              </StyledTypography>
            </SyledCardContent>
          </SyledCard>
          </Grid>
          </Grid>
    </Box>
  );
}

export default HomePage;
