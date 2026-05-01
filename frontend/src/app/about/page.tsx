'use client'

import { useTheme } from '@mui/material/styles';

import { blogLink, longDelay, standardTextFade } from '../_common/constants';
import Fade from '@mui/material/Fade';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Box from "@mui/material/Box";
import TopBar from '../_common/TopBar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

function AboutSitePage() {

  const theme = useTheme();

  return (
    <>
      <TopBar text="About" isPuzzlePage={false} resetFunc={undefined} />
      <Fade in={true} mountOnEnter unmountOnExit timeout={standardTextFade}>      
        <Box sx={{ width: 'var(--pageWidthPercent)', position: "relative", mb: "8vh", mt: "2vh" }}>
          <Typography align="center">
            Solve each
            self-contained puzzle and uncover the secrets of the mysterious Mr. Riddle
            Man!
          </Typography>
          <br /> 
          <Typography align="center">
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
            </a> If you have any other questions or issues with the site, feel free to shoot me an email at <i>thebigdkindustries@gmail.com</i>.
          </Typography>
        </Box>
      </Fade>
      <Box>
        <Fade 
          in={true} 
          mountOnEnter 
          unmountOnExit 
          timeout={standardTextFade}
          style={{transitionDelay: longDelay + "ms"}}
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
                    &nbsp; &nbsp; Global Leaderboards ✔️
                  </Typography>
                } 
              />
            </ListItem>
            <ListItem>
              <ListItemText  
                primary={
                  <Typography align="center" variant="h6">
                    &nbsp; &nbsp; Authentication & Stat tracking ✔️
                  </Typography>
                } 
              />
            </ListItem>
            <ListItem>
              <ListItemText  
                  primary={
                    <Typography align="center" variant="h6">
                      &nbsp; &nbsp; Mobile Friendly Layouts ✔️
                    </Typography>
                  } 
              />
            </ListItem>

          </List> 
        </Fade>
      </Box>
    </>
  );
}

export default AboutSitePage;
