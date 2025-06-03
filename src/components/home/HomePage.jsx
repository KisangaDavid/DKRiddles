import { useState } from 'react'

import Chip from '@mui/material/Chip';
import ratRiddleThumbnail from '/src/assets/ratRiddleThumbnail.png' // TODO: see how this looks transparent
import underConstruction from '/src/assets/underConstruction.jpg'
import PuzzleCard from './PuzzleCard';

import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import TopBar from '/src/components/common/TopBar.jsx';


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
          <Grid size={{ sm: 6, lg: 4 }}>
            <PuzzleCard 
              puzzleImage = {ratRiddleThumbnail} 
              puzzleName = "The Hiding Rat" 
              puzzleNumber = "1" 
              puzzleDescription = "Help Mr. Riddle Man catch a sneaky rat!"
              puzzlePath = "/ratRiddle" />
          </Grid>
        <Grid size={{ sm: 6, lg: 4 }}>
          <PuzzleCard 
              puzzleImage = {underConstruction} 
              puzzleName = "Puzzle Under Construction!" 
              puzzleNumber = "2" 
              puzzleDescription = "Mr. Riddle Man isn't ready to show this puzzle yet, come back later!"
              puzzlePath = "/" />
          </Grid>
                  <Grid size={{ sm: 6, lg: 4 }}>
                    <PuzzleCard 
              puzzleImage = {underConstruction} 
              puzzleName = "Puzzle Under Construction!" 
              puzzleNumber = "2" 
              puzzleDescription = "Mr. Riddle Man isn't ready to show this puzzle yet, come back later!"
              puzzlePath = "/" />
          </Grid>
          </Grid>
    </Box>
  );
}

export default HomePage;
