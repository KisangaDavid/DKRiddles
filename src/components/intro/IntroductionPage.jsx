import { useState } from 'react'
import { useTheme } from '@mui/material/styles';

import Chip from '@mui/material/Chip';
import ratRiddleThumbnail from '/src/assets/ratRiddleThumbnail.png'
import horseRiddleThumbnail from '/src/assets/horseClipArt.png'
import roosterRiddleThumbnail from '/src/assets/roosterRiddleThumbnail.png'
import mysteryLetter from '/src/assets/mysteryLetter.jpg'
import PuzzleCard from './PuzzleCard';
import RiddleManLetter from '/src/assets/riddleManLetter.jpg';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import TopBar from '../common/TopBar.jsx';
import PageWrapper from '../common/PageWrapper.jsx';

function IntroductionPage() {

  const theme = useTheme();
  const [activatedChip, setActivatedChip] = useState(-1);

  return (
    <PageWrapper>
      <TopBar text="Introduction" isPuzzlePage={false} />
      <Fade in={true} mountOnEnter unmountOnExit timeout={theme.transitions.duration.standardTextFade}>
        <Box sx={{width: "75vw", position: "relative", mb:"1vh"}}>
          <p>
            Mr. Riddle Man - a name shrouded in mystery. Renowed by many to be the world's
            foremost puzzle expert, he is often called upon to solve the world's toughest
            conundrums - and none have stumped him yet. Despite his world-famous status,
            no one knows his true identity. That's all you know about the man - at least
            all you <i>did</i> know, until a ... <i>puzzling</i> set of envelopes arrived
            at your doorstep this morning. You notice a letter lying atop the envelopes.
          </p>
        </Box>
      </Fade>
      <br />
      <Fade in={true} mountOnEnter unmountOnExit timeout={theme.transitions.duration.standardTextFade}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: "row",
            width: '75%',
            alignItems: "start",
            gap: 1,
            overflow: 'clip',
            mb: "4vh"
          }}
        >
          <Chip 
            size="medium" 
            onClick={() => setActivatedChip(0)} 
            label= "Letter"
            sx={{
              fontWeight: 600,
              backgroundColor: activatedChip == 0 ? 'hsla(222, 21.30%, 12.00%, 0.51)' : 'hsla(208, 100.00%, 3.70%, 0.64)',
              border: activatedChip === 0 ? 1 : 'none'
            }} 
          />
          <Chip onClick={() => setActivatedChip(1)}
            size="medium"
            label="All Envelopes"
            sx={{
              fontWeight: 600,
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
          <Grid size={6}>
            <Fade in={true} mountOnEnter unmountOnExit timeout={theme.transitions.duration.standardImageFade}>
              <Box>
              <img 
                src={RiddleManLetter} 
                style={{
                  objectFit: "contain", 
                  height: "100%", 
                  width: "100%", 
                  borderRadius: theme.shape.borderRadius,
                  border: `1px solid hsla(0, 0%, 23%, 0.60)`,
                }}
              />
              </Box>
            </Fade>
          </Grid>
          <Grid size={{ sm: 12, lg: 6}} style={{display: "flex", justifyContent: 'center', alignItems: "center"}}>   
            <Fade 
              in={true}  
              mountOnEnter 
              unmountOnExit 
              style = {{transitionDelay: theme.delays.duration.longDelay}} 
              timeout={theme.transitions.duration.longTextFade}
            >     
            <p style={{ textAlign: "left" }}>      
              The letter reads: <br /> <br />
              <i>
                I am Mr. Riddle Man. I grow weary of my power and status, and so wish to
                pass the title of Mr. Riddle Man to another. Attatched to this letter you
                shall find a set of envelopes. Each envelope contains a puzzle - solve them
                all in their entirety, and I shall name you as my successor. Should you
                choose to accept, I advise secrecy of the highest order - the identity of a
                Riddle Man must always be hidden, as there are those in this world who stand
                much to gain from our demise. Prove your commitment to the cause by solving
                my riddles, and in time I will reveal to you the secrets of the Riddle Men,
                as well as my true identity.
                <br /> <br />
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
          <Grid size={{ sm: 6, lg: 3 }}>
            <PuzzleCard 
              puzzleImage = {ratRiddleThumbnail} 
              puzzleName = "The Sneaky Rat" 
              puzzleNumber = "1" 
              puzzleDescription = "Concoct the perfect plan to catch a sneaky rat!"
              puzzlePath = "/ratRiddle" 
              transitionDelay={0}
            />
          </Grid>
          <Grid size={{ sm: 6, lg: 3 }}>
            <PuzzleCard 
              puzzleImage = {horseRiddleThumbnail} 
              puzzleName = "The Horse Trifecta" 
              puzzleNumber = "2" 
              puzzleDescription = "Utilize your skills of deduction to win big at the horse races!"
              puzzlePath = "/horseRiddle" 
              transitionDelay={theme.delays.duration.standardDelay}
            />
          </Grid>
          <Grid size={{ sm: 6, lg: 3 }}>
            <PuzzleCard 
              puzzleImage = {roosterRiddleThumbnail} 
              puzzleName = "The Undefeated Rooster" 
              puzzleNumber = "3" 
              puzzleDescription = "Best the undefeated rooster in a battle of intellect!"
              puzzlePath = "/roosterRiddle" 
              transitionDelay={theme.delays.duration.standardDelay * 2}
            />
          </Grid>
          <Grid size={{ sm: 6, lg: 3 }}>
            <PuzzleCard 
              puzzleImage = {mysteryLetter} 
              puzzleName = "Puzzle in Progress!" 
              puzzleNumber = "4" 
              puzzleDescription = "Come back later to find a a brand new puzzle from Mr. Riddle Man!"
              puzzlePath = "/" 
              transitionDelay={theme.delays.duration.standardDelay * 3}
            />
          </Grid>
        </Grid>
      }
    </PageWrapper>
  );
}

export default IntroductionPage;
