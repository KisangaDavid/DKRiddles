import { useTheme } from '@mui/material/styles';

import RootBackground from "../common/RootBackground.jsx";
import Fade from '@mui/material/Fade';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from "@mui/material/Box";
import TopBar from '../common/TopBar.jsx';
import { ListItemText,Stack, Typography } from '@mui/material';

function AboutRatRiddle() {

  const theme = useTheme();

  return (
    <RootBackground>
      <TopBar text="About Envelope #1: The Rat Riddle" isIntroPage={true} resetFunc={null} />
      {/* <Fade in={true} mountOnEnter unmountOnExit timeout={theme.transitions.duration.standardTextFade}>   */}
        <>    
        <Box sx={{width: "50vw", position: "relative", mb:"8vh", mt:"2vh"}}>
        <Typography> One of my favorite puzzles! Simple enough that , switches in approach. When I decided to make an interactive puzzle website, I knew this would be the first puzzle I added.</Typography> <br />
        <Typography align="left" variant="h4"sx={{mb: "1vh"}}>Solution Explanation</Typography>
        <Typography align="left">
          To start, let's assume that the rat begins in an even numbered house, 
          i.e. houses 2, 4, 6, or 8. On day one we trap houses 2 and 4. If we don't catch the rat, that means the rat started in house 6 or 8. Now, notice
          that the only houses adjacent to house 6 and 8 are houses 5 and 7. Since the rat has to move to an adjacent house each day, we can trap houses 5 and 7 on day two, guaranteeing that
          we will catch the rat if it started in an even numbered house! If we don't find the rat on day 2, we can definitively conclude that the rat did NOT start in an even numbered house.
          TODO: image,
          finish explanation of basic logic
          code explanation?
        </Typography>
          </Box>
          <Box sx={{display: "flex", width: "50vw", position: "relative", mb:"8vh",}}>
           
          </Box>
          </>
      {/* </Fade> */}
      <Box>
        {/* <Fade in={true} mountOnEnter unmountOnExit timeout={theme.transitions.duration.standardTextFade}style={{transitionDelay: theme.delays.duration.longDelay}}>
          <p> hello</p>
        </Fade> */}
      </Box>
    </RootBackground>
  );
}

export default AboutRatRiddle;
