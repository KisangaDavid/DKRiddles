import { useTheme } from '@mui/material/styles';

import RootBackground from "../common/RootBackground.jsx";
import Fade from '@mui/material/Fade';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from "@mui/material/Box";
import TopBar from '../common/TopBar.jsx';
import { ListItemText,Stack, Typography } from '@mui/material';

function AboutHorseRiddle() {

  const theme = useTheme();

  return (
    <RootBackground>
      <TopBar text="About" isIntroPage={true} resetFunc={null} />
      <Fade in={true} mountOnEnter unmountOnExit timeout={theme.transitions.duration.standardTextFade}>      
        <Box sx={{width: "70vw", position: "relative", mb:"8vh"}}>
        <p> Welcome to DKRiddles, an interactive puzzle website. Solve each self-contained puzzle and uncover the secrets of the mysterious Mr. Riddle Man!<br /> <br />
          After completing a puzzle, check out the corresponding <i>About this Puzzle</i> page in the sidebar. The about page describes the logic behind each puzzle, its implementation,
          and any other interesting tidbits I came across while creating the puzzle. For more technical details, such as the strange techstack I chose for the site or the many lessons learned while figuring out how to compile C++ to WebAssembly
          without Emscripten, <a href="https://github.com/KisangaDavid/DKRiddles">check out the code on Github</a>! </p>
          </Box>
      </Fade>
      <Box>
        <Fade in={true} mountOnEnter unmountOnExit timeout={theme.transitions.duration.standardTextFade}style={{transitionDelay: theme.delays.duration.longDelay}}>
          <Stack 
            direction="row"
            spacing={10}>
              <List subheader={<Typography variant="h4" sx={{mb: "1vh"}}>
                        Completed Features
                      </Typography>}>
                <ListItem>
                  <ListItemText  
                    primary={
                      <Typography variant="h5">
                        Navigation Sidebar
                      </Typography>
                    } 
                  />
                </ListItem>
                    <ListItem>
                  <ListItemText  
                    primary={
                      <Typography variant="h5">
                        Puzzle About Pages
                      </Typography>
                    } 
                  />
                </ListItem>
                    <ListItem>
                  <ListItemText  
                    primary={
                      <Typography variant="h5">
                        Basic Animations
                      </Typography>
                    } 
                  />
                </ListItem>
                    <ListItem>
                  <ListItemText  
                    primary={
                      <Typography variant="h5">
                        Rat, Horse, and Rooster Puzzles
                      </Typography>
                    } 
                  />
                </ListItem>
              </List>
              <List subheader={<Typography variant="h4" sx={{mb: "1vh"}}>
                        Upcoming Features
                      </Typography>}>
                <ListItem>
                  <ListItemText  
                    primary={
                      <Typography variant="h5">
                        Transition to Typescript
                      </Typography>
                    } 
                  />
                </ListItem>
                    <ListItem>
                  <ListItemText  
                    primary={
                      <Typography variant="h5">
                        Custom C++ vector implementation
                      </Typography>
                    } 
                  />
                </ListItem>
                    <ListItem>
                  <ListItemText  
                    primary={
                      <Typography variant="h5">
                        Mobile Friendly Layouts
                      </Typography>
                    } 
                  />
                </ListItem>
                <ListItem>
                  <ListItemText  
                    primary={
                      <Typography variant="h5">
                        More Puzzles!
                      </Typography>
                    } 
                  />
                </ListItem>
              </List> 
          </Stack> 
        </Fade>
      </Box>
    </RootBackground>
  );
}

export default AboutHorseRiddle;
