import { styled, useTheme } from '@mui/material/styles';

import RootBackground from "../common/RootBackground.jsx";
import Fade from '@mui/material/Fade';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from "@mui/material/Box";
import TopBar from '../common/TopBar.jsx';
import RatRiddleAboutPic1 from '/src/assets/RatRiddleAboutPic1.jpg';
import { Card, CardContent, CardMedia, ListItemText,Stack, Typography } from '@mui/material';

function AboutRatRiddle() {

  const StyledCardContent = styled(CardContent)({
    display: 'flex',
    flexDirection: 'column',
    padding: 8,
    paddingTop: 8,
    flexGrow: 1,
    backgroundImage:
				"radial-gradient(ellipse 55% 55% at 50% -5%, hsl(210, 100%, 16%), hsla(208, 100.00%, 3.70%, 0.64))",
    height: "100%",
    '&:last-child': {
        paddingBottom: 8,
    },
  });

  const theme = useTheme();

  return (
    <RootBackground>
      <TopBar text="About Envelope #1: The Rat Riddle" isIntroPage={true} resetFunc={null} />
      <Fade in={true} mountOnEnter unmountOnExit timeout={theme.transitions.duration.standardTextFade}>  
        <Box sx={{width: "45vw", position: "relative", mb:"8vh", mt:"2vh"}}>
          <Typography> One of my favorite puzzles! Simple enough that anyone can crack it, but tricky enough that finding the optimal solution will probably take some time. When I decided to make an interactive puzzle website, I knew this would be the first puzzle I added.</Typography> <br />
          <Typography align="left" variant="h4"sx={{mb: "1vh"}}>Solution</Typography>
          <Typography align="left">
            To start, let's assume that the rat begins in an even numbered house, 
            i.e. houses 2, 4, 6, or 8. On the first day, we trap houses 2 and 4. If we don't catch the rat, that means the rat started in house 6 or 8. Now, notice
            that the only houses adjacent to house 6 and 8 are houses 5 and 7. Since the rat has to move to an adjacent house each day, we can trap houses 5 and 7 on day two, guaranteeing that
            we will catch the rat if it started in an even numbered house. If we don't find the rat on day two, we can definitively conclude that the rat started in an odd numbered house!
            <br /> <br />
          </Typography>
          <Card sx={{padding: 0}}>
            <CardMedia
              component="img"
              image={RatRiddleAboutPic1}
              sx={{ 
                width: '100%',
                objectFit: 'contain'
              }}
            />
            <StyledCardContent>
              <Typography>A rat currently in houses 6 or 8 must move to either house 5 or 7 on the next day</Typography>
            </StyledCardContent>
          </Card>
          <Typography align="left">
            <br />
            If the rat started in an odd numbered house, then on day 3 it will also be in an odd numbered house (notice that the parity of the house number the rat is in flips each day). Thus, we can 
            employ a similar strategy to before: on day three, we check houses 5 and 7. If we don't find the rat, then the rat must have been in houses 1 or 3. Since the only houses adjacent to houses 1 and 3
            are houses 2 and 4, we check those houses on day four, guaranteeing that we catch the rat in only four days! <br /> <br />
          </Typography>
          <Typography align="left" variant="h4"sx={{mb: "1vh"}}>Code Logic</Typography>
           <Typography align="left">
            The first problem to solve is how to verify if a submitted arrangement of traps will successfully catch the rat. 
            Sure, for this case where there are only 8 houses and a limit of 7 days, it would be completely feasible to enumerate
            all possible paths the rat can take, and then check if all those paths run into a trap using the submitted arrangement. That's lame and inefficient though! 
            Let's think of something better. 
            <br /> <br />
          </Typography>
        </Box>
      </Fade>
      <Box>

      </Box>
    </RootBackground>
  );
}

export default AboutRatRiddle;
