import { useState } from 'react'
import { useNavigate } from "react-router";

import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import ratRiddleThumbnail from '/src/assets/ratRiddleThumbnail.png' // TODO: make this transparent
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import TopBar from '/src/components/common/TopBar.jsx';


function HomePage() {

  const [activatedChip, setActivatedChip] = useState(0);
  const navigate = useNavigate();


  const handleChipClick = () => {
    console.log("Chip clicked!");
  }
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
// TODO: make a puzzleCard component 
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
      WIP. Currently only the hiding rat riddle is done - check it out by clicking on it below or using the dropdown menu on the top left.
           <Box
          sx={{
            display: 'inline-flex',
            flexDirection: 'row',
            gap: 3,
            overflow: 'auto',
          }}
        >
      <Chip 
        size="medium" 
        onClick={() => setActivatedChip(0)} 
        label= "Puzzles"
        sx={{
              backgroundColor: activatedChip == 0 ? 'hsla(222, 21.30%, 12.00%, 0.51)' : 'hsla(208, 100.00%, 3.70%, 0.64)',
              border: activatedChip === 0 ? 1 : 'none'
            }} />
          <Chip onClick={() => setActivatedChip(1)}
            size="medium"
            label="Placeholder 1"
            sx={{
              backgroundColor: activatedChip == 1 ? 'hsla(222, 21.30%, 12.00%, 0.51)' : 'hsla(208, 100.00%, 3.70%, 0.64)',
              border: activatedChip === 1 ? 1 : 'none'
            }}
          />
          <Chip onClick={() => setActivatedChip(2)}
            size="medium"
            label="Placeholder 2"
            sx={{
              backgroundColor: activatedChip == 2 ? 'hsla(222, 21.30%, 12.00%, 0.51)' : 'hsla(208, 100.00%, 3.70%, 0.64)',
              border: activatedChip === 2 ? 1 : 'none'
            }}
          />
          </Box>
        <Grid container spacing={2} columns={12} direction = "row" sx={{width: "60vw"}}>
          <Grid size={ 4 }>
          <SyledCard
            variant="outlined"
             onClick={() => navigate("/ratRiddle")}
          > 
              <CardMedia
              component="img"
              image={ratRiddleThumbnail}
              sx={{
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            />
              <SyledCardContent>
              <Typography gutterBottom variant="caption" component="div">
                Puzzle #1
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                The Hiding Rat
              </Typography>
              <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                Help Mr. Riddle Man catch a sneaky rat!
              </StyledTypography>
            </SyledCardContent>
          </SyledCard>
          </Grid>
        <Grid size={ 4 }>
          <SyledCard
            variant="outlined"
          > 
              <CardMedia
              component="img"
              image={ratRiddleThumbnail}
              sx={{
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            />
              <SyledCardContent>
              <Typography gutterBottom variant="caption" component="div">
                Placeholder Puzzle #2
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                Placeholder Title #2
              </Typography>
              <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                Placeholder Description #2
              </StyledTypography>
            </SyledCardContent>
          </SyledCard>
          </Grid>
                  <Grid size={ 4 }>
          <SyledCard
            variant="outlined"
          > 
              <CardMedia
              component="img"
              image={ratRiddleThumbnail}
              sx={{
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            />
              <SyledCardContent>
              <Typography gutterBottom variant="caption" component="div">
                Placeholder Puzzle #3
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                Placeholder Title #3
              </Typography>
              <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                Placeholder Description #3
              </StyledTypography>
            </SyledCardContent>
          </SyledCard>
          </Grid>
          </Grid>
    </Box>
  );
}

export default HomePage;
