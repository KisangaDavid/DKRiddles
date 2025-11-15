'use client'

import { useTheme } from '@mui/material/styles';

import { blogLink, githubLink } from '../_common/utils.js';
import Fade from '@mui/material/Fade';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Box from "@mui/material/Box";
import TopBar from '../_common/TopBar.jsx';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

function AboutSitePage() {

  const theme = useTheme();

  return (
    <>
      <TopBar text="About" isPuzzlePage={false} resetFunc={null} />
      <Fade in={true} mountOnEnter unmountOnExit timeout={theme.transitions.duration.standardTextFade}>      
        <Box sx={{ width: 'var(--pageWidthPercent)', position: "relative", mb: "8vh", mt: "2vh" }}>
          <Typography align="center">
            Welcome to DKRiddles, an interactive puzzle website. Solve each
            self-contained puzzle and uncover the secrets of the mysterious Mr. Riddle
            Man!
          </Typography>
          <br /> 
          <Typography align="left">
            After completing a puzzle, check out the corresponding <i>Puzzle Breakdown</i> page 
            in the sidebar. The breakdown page describes the logic behind each puzzle, 
            its implementation, and any other interesting tidbits I came across while 
            creating the puzzle. If you're truly stumped on a puzzle, or are looking for more information on how the page was made, {" "}
            <a
              target="_blank"
              rel="noopener"
              href={blogLink}
            >
              check out my blog site!
            </a>{" "}
            If you prefer diving into the nitty-gritty details yourself, the full code is also {" "}
            <a
              target="_blank"
              rel="noopener"
              href={githubLink}
            >
              available on Github!
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
          <List subheader={
            <Typography variant="h5" sx={{mb: "1vh"}}>
                Coming Soon
            </Typography>}>
            <ListItem>
              <ListItemText  
                primary={
                  <Typography align="center" variant="h6">
                    More Puzzles!
                  </Typography>
                } 
              />
            </ListItem>
            <ListItem>
              <ListItemText  
                  primary={
                    <Typography align="center" variant="h6">
                      Mobile Friendly Layouts
                    </Typography>
                  } 
              />
            </ListItem>
            <ListItem>
              <ListItemText  
                primary={
                  <Typography align="center" variant="h6">
                    Typescript Rewrite
                  </Typography>
                } 
              />
            </ListItem>
            <ListItem>
              <ListItemText  
                primary={
                  <Typography align="center" variant="h6">
                    Migrate to Nextjs 
                  </Typography>
                } 
              />
              <ListItemIcon sx={{display: "flex", position: "absolute", right: "-10px"}}>
                <CheckRoundedIcon fontSize = "large" sx={{ ml: "10px", color: theme.palette.success.main }} />
              </ListItemIcon>
            </ListItem>
          </List> 
        </Fade>
      </Box>
    </>
  );
}

export default AboutSitePage;
