import { useState } from 'react'
import { useTheme } from '@mui/material/styles';

import Chip from '@mui/material/Chip';
import ratRiddleThumbnail from '/src/assets/ratRiddleThumbnail.png'
import mysteryLetter from '/src/assets/mysteryLetter.jpg'
import PuzzleCard from './PuzzleCard';
import RiddleManLetter from '/src/assets/riddleManLetter.jpg';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import TopBar from '/src/components/common/TopBar.jsx';

function IntroductionPage() {

  const theme = useTheme();
  const [activatedChip, setActivatedChip] = useState(-1);

  return (
    <Box 
      sx={{
        display:"flex",
        flexDirection: 'column',
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        overflow: "auto",
        backgroundImage:'radial-gradient(ellipse 80% 50% at 50% -15%, hsl(210, 100%, 16%), hsla(208, 100.00%, 3.70%, 0.64))',
      }}
    >
      <TopBar text="Introduction" isIntroPage={true} />
      <Fade in={true} mountOnEnter unmountOnExit timeout={theme.transitions.duration.standardTextFade}>
        <Box sx={{width: "75vw", position: "relative", mb:"1vh"}}>
          <p> 
            Mr. Riddle Man - a name shrouded in mystery. Renowed by many to be the world's foremost puzzle expert, he is often called upon
            to solve the world's toughest conundrums - and none have stumped him yet. Despite his world-famous status, no one knows his true identity. 
            That's all you know about the man - at least all you <i>did</i> know, until a ... <i>puzzling</i> set of envelopes arrived at 
            your doorstep this morning. You notice a letter lying atop the envelopes. <br />  
          </p>
        </Box>
      </Fade>
      <Fade in={true} mountOnEnter unmountOnExit timeout={theme.transitions.duration.standardTextFade}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            width: '75%',
            alignItems: { xs: 'start', md: 'center' },
            gap: 1,
            overflow: 'auto',
            mb: "2vh"
          }}
        >
          <Chip 
            size="medium" 
            onClick={() => setActivatedChip(0)} 
            label= "Letter"
            sx={{
              backgroundColor: activatedChip == 0 ? 'hsla(222, 21.30%, 12.00%, 0.51)' : 'hsla(208, 100.00%, 3.70%, 0.64)',
              border: activatedChip === 0 ? 1 : 'none'
            }} 
          />
          <Chip onClick={() => setActivatedChip(1)}
            size="medium"
            label="All Envelopes"
            sx={{
              backgroundColor: activatedChip == 1 ? 'hsla(222, 21.30%, 12.00%, 0.51)' : 'hsla(208, 100.00%, 3.70%, 0.64)',
              border: activatedChip === 1 ? 1 : 'none'
            }}
          />
        </Box>
      </Fade>
      {activatedChip == 0 &&
        <Grid 
          container 
          spacing={4} 
          columns={12} 
          direction = "row" 
          sx={{
            display: "flex",
            width: "70vw"
          }}
        >
          <Grid size={{ sm: 12, lg: 6 }}>
            <Fade in={true} mountOnEnter unmountOnExit timeout={theme.transitions.duration.standardImageFade}>
              <img src={RiddleManLetter} style={{objectFit: "contain", height: "100%", width: "100%", borderRadius: (theme.vars || theme).shape.borderRadius}}/>
            </Fade>
          </Grid>
          <Grid size={{ sm: 12, lg: 6}} style={{display: "flex", justifyContent: 'center', alignItems: "center"}}>   
            <Fade in={true}  mountOnEnter unmountOnExit style = {{transitionDelay: 750}} timeout={theme.transitions.duration.longTextFade}>           
              <p style={{ textAlign: 'left' }}>
                The letter reads: <br /> <br />
                <i>
                  I am Mr. Riddle Man. I grow weary of my power and status, and so wish to pass the title of Mr. Riddle Man to another.
                  Attatched to this letter you shall find a set of envelopes. Each envelope contains a puzzle - solve them all in their entirety, 
                  and I shall name you as my successor. Should you choose to accept, I advise secrecy of the highest order - 
                  the identity of a Riddle Man must always be hidden, as there are those in this world who stand much to gain from our demise. 
                  Prove your commitment to the cause by solving my riddles, and in time I will reveal to you the secrets of the Riddle Men, 
                  as well as my true identity.
                  <br />  <br />
                  I will be watching, <br />
                  Mr. Riddle Man 
                </i>
              </p>
            </Fade>
          </Grid>
        </Grid>
      }
      {activatedChip == 1 &&
        <Grid container spacing={2} columns={12} direction = "row" sx={{width: "75vw"}}>
          <Grid size={{ sm: 6, lg: 4 }}>
            <PuzzleCard 
              puzzleImage = {ratRiddleThumbnail} 
              puzzleName = "The Sneaky Rat" 
              puzzleNumber = "1" 
              puzzleDescription = "Concoct the perfect plan to catch a sneaky rat!"
              puzzlePath = "/ratRiddle" 
              transitionDelay={0}
            />
          </Grid>
          <Grid size={{ sm: 6, lg: 4 }}>
            <PuzzleCard 
              puzzleImage = {mysteryLetter} 
              puzzleName = "Puzzle in Progress!" 
              puzzleNumber = "2" 
              puzzleDescription = "Mr. Riddle Man isn't ready to show this puzzle yet, come back later!"
              puzzlePath = "/" 
              transitionDelay={350}
            />
          </Grid>
          <Grid size={{ sm: 6, lg: 4 }}>
            <PuzzleCard 
              puzzleImage = {mysteryLetter} 
              puzzleName = "Puzzle in Progress!" 
              puzzleNumber = "2" 
              puzzleDescription = "Mr. Riddle Man isn't ready to show this puzzle yet, come back later!"
              puzzlePath = "/" 
              transitionDelay={700}
            />
          </Grid>
        </Grid>
      }
    </Box>
  );
}

export default IntroductionPage;
