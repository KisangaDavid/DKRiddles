import { useState, useEffect, useCallback } from 'react';
import { useWindowSize } from 'react-use';
import { useTheme } from '@mui/material/styles';
import { convertIterableToInt, convertIntToArray, MAX_32_BIT_NUM } from "../common/utils.js";

import RootBackground from "../common/RootBackground.jsx";
import Grid from "@mui/material/Grid";
import RoosterRiddleDescription from './RoosterRiddleDescription.jsx';
import PileStack from './PileStack.jsx';
import Confetti from 'react-confetti'
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Box from "@mui/material/Box";
import TopBar from '../common/TopBar.jsx';

const NUM_BITS_PER_PILE = 4;
const NUM_PILES = 4;

function RoosterRiddlePage({wasmModule}) {
  const theme = useTheme();
  const [piles, setPiles] = useState([]);
  const [selectedKernels, setSelectedKernels] = useState(new Set());
  const [selectedPile, setSelectedPile] = useState(null);

    useEffect(() => {
      generateAndSetPiles();
    }, []);

  const generateAndSetPiles = () => {
    let pilesIntForm = wasmModule.exports.getInitialPiles(Math.floor(Math.random() * MAX_32_BIT_NUM));
    let piles = convertIntToArray(pilesIntForm, NUM_BITS_PER_PILE, NUM_PILES);
    console.log("piles are: " + piles);
    console.log("nimsum of piles: " + (piles[0] ^ piles[1] ^ piles[2] ^ piles[3]));
    piles = piles.map(pile => 
      Array.from({ length: pile }, (_, i) => i)
    );
    setPiles(piles);
  };

  const handleKernelClick = (idx, pileNum) => {
    if (selectedKernels.has(idx)) {
      const newSet = new Set(selectedKernels);
      newSet.delete(idx);
      if (newSet.size == 0) {
        setSelectedPile(null);
      }
      setSelectedKernels(newSet);
    }
    else {
       setSelectedKernels(prevKernels => new Set([...prevKernels, idx]));
       setSelectedPile(pileNum);
    }
    console.log("selected kernels: " + [...selectedKernels]);
  };

  const submitMove = () => {
    let pileAfterRemoval = piles[selectedPile].filter(kernel => !selectedKernels.has(kernel));
    let postPlayerPiles = [...piles.slice(0, selectedPile), pileAfterRemoval, ...piles.slice(selectedPile + 1)]
    let postPlayerPileSums = postPlayerPiles.map(pile => pile.length);
    let randSource = Math.floor(Math.random() * MAX_32_BIT_NUM);
    let pilesIntRep = convertIterableToInt(postPlayerPileSums, NUM_BITS_PER_PILE)
    let roosterMove = wasmModule.exports.getRoosterRiddleMove(pilesIntRep, randSource);
    let [numToTake, pileToTakeFrom] = convertIntToArray(roosterMove, NUM_BITS_PER_PILE, 2);
    console.log("pile to take from" + pileToTakeFrom + "numToTake" + numToTake);
    let postRoosterPiles = executeRoosterMove(pileToTakeFrom, numToTake, postPlayerPiles);
    console.log("piles pre update: " + piles);
    console.log("postRoosterPiles: " + postRoosterPiles);
    setPiles(postRoosterPiles);
    setSelectedKernels(new Set());
    setSelectedPile(null);
    console.log("submitted move!");
  }

  const executeRoosterMove = (pileToTakeFrom, numToTake, postPlayerPiles) => {
    let pileAfterRemoval = postPlayerPiles[pileToTakeFrom].slice(0, -numToTake);
    return [...postPlayerPiles.slice(0, selectedPile), pileAfterRemoval, ...postPlayerPiles.slice(selectedPile + 1)]
  }
  return (
  <RootBackground>
    <TopBar text="Envelope #3: The Undefeated Rooster" isHomePage={false} />
    <RoosterRiddleDescription />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "75vw",
          position: "relative",
          mb: "1vh",
        }}
      >
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={1}
          sx={{
            display: "flex",
            height: "35vh", 
            width: "85%",
            mb: "5vh"
          }}
        >
          {piles.map((pile, idx) => (
            <Box sx = {{display: "flex", position: "relative", overflow: "clip", flex: "1"}}>
              <PileStack 
                pileKernels = {pile} 
                pileNum={idx} 
                canBeSelectedFrom={selectedPile == null || selectedPile == idx} 
                handleKernelClick={(selectedPile == null || selectedPile == idx) ? handleKernelClick: ()=>{}} 
                selectedKernels={selectedKernels}
                setSelectedKernels={setSelectedKernels}
              />
            </Box> 
          ))}
        </Stack>
         <Button variant="contained" disabled={selectedKernels.size < 1} 
                  onClick={submitMove}>Submit Move</Button>
      </Box>
  </RootBackground>
  )
}

export default RoosterRiddlePage