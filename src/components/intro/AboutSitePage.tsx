import { useTheme } from '@mui/material/styles';

import RootBackground from "../common/RootBackground.jsx";
import Fade from '@mui/material/Fade';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from "@mui/material/Box";
import TopBar from '../common/TopBar.jsx';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function AboutSitePage() {

  const theme = useTheme();

  return (
    <RootBackground>
      <TopBar text="About" isPuzzlePage={false} resetFunc={null} />
      <Fade in={true} mountOnEnter unmountOnExit timeout={theme.transitions.duration.standardTextFade}>      
        <Box sx={{ width: "70vw", position: "relative", mb: "8vh", mt: "2vh" }}>
          <Typography align="center">
            Welcome to DKRiddles, an interactive puzzle website. Solve each
            self-contained puzzle and uncover the secrets of the mysterious Mr. Riddle
            Man!
          </Typography>
          <br /> <br />
          <Typography align="left">
            After completing a puzzle, check out the corresponding <i>Puzzle Breakdown</i> page 
            in the sidebar. The breakdown page describes the logic behind each puzzle, 
            its implementation, and any other interesting tidbits I came across while 
            creating the puzzle. For more technical details, such as my ... <i>interesting</i> design 
            desisions, or the many lessons learned while figuring out how to 
            compile C++ to WebAssembly without Emscripten,{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/KisangaDavid/DKRiddles"
            >
              check out the code on Github!
            </a>
          </Typography>
        </Box>
      </Fade>
      <Box>
        <Fade 
          in={true} 
          mountOnEnter 
          unmountOnExit 
          timeout={theme.transitions.duration.standardTextFade}
          style={{transitionDelay: theme.delays.duration.longDelay}}
        >
          <List subheader={<Typography variant="h5" sx={{mb: "1vh"}}>
                    Coming Soon
                  </Typography>}>
            <ListItem>
              <ListItemText  
                primary={
                  <Typography variant="h6">
                    More Puzzles!
                  </Typography>
                } 
              />
            </ListItem>
            <ListItem>
              <ListItemText  
                  primary={
                    <Typography variant="h6">
                      Mobile Friendly Layouts
                    </Typography>
                  } 
              />
            </ListItem>
            <ListItem>
              <ListItemText  
                primary={
                  <Typography variant="h6">
                    Typescript Rewrite
                  </Typography>
                } 
              />
            </ListItem>
            <ListItem>
              <ListItemText  
                primary={
                  <Typography variant="h6">
                    Custom C++ vector implementation
                  </Typography>
                } 
              />
            </ListItem>
          </List> 
        </Fade>
      </Box>
    </RootBackground>
  );
}

export default AboutSitePage;
