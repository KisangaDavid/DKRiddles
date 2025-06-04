import { useState } from 'react'

import Chip from '@mui/material/Chip';
import ratRiddleThumbnail from '/src/assets/ratRiddleThumbnail.png' // TODO: see how this looks transparent
import underConstruction from '/src/assets/underConstruction.jpg'
import PuzzleCard from './PuzzleCard';

import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import TopBar from '/src/components/common/TopBar.jsx';

// TODO: add animations 
// TODO: see how an envelope image with a pop up of the text would look like
function HomePage() {

  const [activatedChip, setActivatedChip] = useState(0);

  const handleChipClick = () => {
    console.log("Chip clicked!");
  }
  
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
       <Box sx={{width: "75vw", position: "relative", mb:"1vh"}}>
      <p> 
        Mr. Riddle Man - a name shrouded in mystery. Renowed by many to be the world's foremost puzzle expert, he is often called upon
        to solve the world's toughest conundrums - and none have stumped him yet. Despite his world-famous status, no one knows his true identity. 
        That's all you know about the man - at least all you <i>did</i> know, until a  ... <i>puzzling</i> set of envelopes arrived at 
        your doorstep this morning. You notice a letter laying atop the envelopes.<br />  
      </p>
    </Box>
           <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
          width: '75%',
          alignItems: { xs: 'start', md: 'center' },
          gap: 1,
          overflow: 'auto',
          }}
        >
      <Chip 
        size="medium" 
        onClick={() => setActivatedChip(0)} 
        label= "Note"
        sx={{
              backgroundColor: activatedChip == 0 ? 'hsla(222, 21.30%, 12.00%, 0.51)' : 'hsla(208, 100.00%, 3.70%, 0.64)',
              border: activatedChip === 0 ? 1 : 'none'
            }} />
          <Chip onClick={() => setActivatedChip(1)}
            size="medium"
            label="All Envelopes"
            sx={{
              backgroundColor: activatedChip == 1 ? 'hsla(222, 21.30%, 12.00%, 0.51)' : 'hsla(208, 100.00%, 3.70%, 0.64)',
              border: activatedChip === 1 ? 1 : 'none'
            }}
          />
          </Box>
          {/* box containing a multitude of envelopes */}
          {activatedChip == 0 &&
            <Box sx={{width: "60vw",  height: "60%", display: "flex", alignItems: "center", justifyContent: "center"}}>
              <p style={{ textAlign: 'left' }}>
                I am Mr. Riddle Man. I grow weary of my power and status, and so wish to pass the title of Mr. Riddle Man to another.
                Attatched to this note you shall find a set of envelopes. Each envelope contains a puzzle - solve them all in their entirety, 
                and I shall name you as my successor. Should you choose to accept, I advise secrecy of the highest order - the identity of a Riddle Man must always be hidden, 
                as there are those in this world who stand much to gain from our demise. Prove your commitment to the cause by solving my riddles , and in time I will reveal to you the secrets of the Riddle Men, as well as my true identity.
                <br />  <br />
                I will be watching, <br />
                Mr. Riddle Man
              </p>
            </Box>
          }
        {activatedChip == 1 &&
          <Grid container spacing={2} columns={12} direction = "row" sx={{width: "60vw"}}>
            <Grid size={{ sm: 6, lg: 4 }}>
              <PuzzleCard 
                puzzleImage = {ratRiddleThumbnail} 
                puzzleName = "The Hiding Rat" 
                puzzleNumber = "1" 
                puzzleDescription = "Help Mr. Riddle Man catch a sneaky rat!"
                puzzlePath = "/ratRiddle" 
              />
            </Grid>
          <Grid size={{ sm: 6, lg: 4 }}>
            <PuzzleCard 
              puzzleImage = {underConstruction} 
              puzzleName = "Puzzle Under Construction!" 
              puzzleNumber = "2" 
              puzzleDescription = "Mr. Riddle Man isn't ready to show this puzzle yet, come back later!"
              puzzlePath = "/" 
            />
          </Grid>
            <Grid size={{ sm: 6, lg: 4 }}>
              <PuzzleCard 
                puzzleImage = {underConstruction} 
                puzzleName = "Puzzle Under Construction!" 
                puzzleNumber = "2" 
                puzzleDescription = "Mr. Riddle Man isn't ready to show this puzzle yet, come back later!"
                puzzlePath = "/" 
              />
            </Grid>
          </Grid>
        }
    </Box>
  );
}

export default HomePage;
