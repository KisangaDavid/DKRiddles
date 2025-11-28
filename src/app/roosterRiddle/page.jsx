'use client'

import { useState, useEffect, useContext } from 'react';
import { useWindowSize } from 'react-use';
import { useTheme } from '@mui/material/styles';
import { convertIterableToInt, convertIntToArray, MAX_32_BIT_NUM, WasmContext } from "../_common/utils.js";

import RoosterRiddleDescription from './RoosterRiddleDescription.jsx';
import RoosterMoveDescription from './RoosterMoveDescription.jsx';
import RoosterRiddleResults from './RoosterRiddleResults.jsx';
import PileStack from './PileStack.jsx';
import Confetti from 'react-confetti'
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Box from "@mui/material/Box";
import TopBar from '../_common/TopBar.jsx';

const NUM_BITS_PER_PILE = 4;
const NUM_PILES = 4;

function RoosterRiddlePage() {
  const theme = useTheme();
  const [showResultScreen, setShowResultScreen] = useState(false);
  const [gameIsWon, setGameIsWon] = useState(false);
  const [piles, setPiles] = useState([]);
  const [selectedKernels, setSelectedKernels] = useState(new Set());
  const [selectedPile, setSelectedPile] = useState(null);
  const [roosterMove, setRoosterMove] = useState([null, null]);
  const {width, height} = useWindowSize();
  const {wasmExports, _} = useContext(WasmContext);

  useEffect(() => {
    if (wasmExports !== null) {
      generateAndSetPiles();
    }
  }, [wasmExports]);

  const generateAndSetPiles = () => {
    let pilesIntForm = wasmExports.getInitialPiles(Math.floor(Math.random() * MAX_32_BIT_NUM));
    let piles = convertIntToArray(pilesIntForm, NUM_BITS_PER_PILE, NUM_PILES);
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
  };

  const submitMove = () => {
    let pileAfterRemoval = piles[selectedPile].filter(kernel => !selectedKernels.has(kernel));
    let pilesPostPlayerMove = [...piles.slice(0, selectedPile), pileAfterRemoval, ...piles.slice(selectedPile + 1)]
    let postPlayerPileSums = pilesPostPlayerMove.map(pile => pile.length);
    if (postPlayerPileSums.reduce((a, b) => a + b, 0) == 0) {
      setPiles(pilesPostPlayerMove);
      setGameIsWon(true);
      return;
    }
    let randSource = Math.floor(Math.random() * MAX_32_BIT_NUM);
    let pilesIntRep = convertIterableToInt(postPlayerPileSums.reverse(), NUM_BITS_PER_PILE);
    let roosterMove = wasmExports.getRoosterRiddleMove(pilesIntRep, randSource);
    let [numToTake, pileToTakeFrom] = convertIntToArray(roosterMove, NUM_BITS_PER_PILE, 2);
    setPiles(pilesPostPlayerMove);
    setSelectedKernels(new Set());
    setSelectedPile(null);
    setTimeout(() => {
      executeRoosterMove(pileToTakeFrom, numToTake, pilesPostPlayerMove);;
    }, theme.delays.duration.longDelay);
  }

  const executeRoosterMove = (pileToTakeFrom, numToTake, pilesPostPlayerMove) => {
    setRoosterMove([pileToTakeFrom, pilesPostPlayerMove[pileToTakeFrom].slice(-numToTake)]);
    let pileAfterRoosterRemoval = pilesPostPlayerMove[pileToTakeFrom].slice(0, -numToTake);
    setPiles([...pilesPostPlayerMove.slice(0, pileToTakeFrom), pileAfterRoosterRemoval, ...pilesPostPlayerMove.slice(pileToTakeFrom + 1)]);
  }

  const resetPuzzle = () => {
    generateAndSetPiles()
    setShowResultScreen(false);
    setGameIsWon(false);
    setSelectedKernels(new Set());
    setSelectedPile(null);
    setRoosterMove([null, null]);
  }

  if (piles.length > 0 && piles.reduce((a, b) => a + b.length, 0) == 0) {
    setTimeout(() => {
      setShowResultScreen(true);
    }, theme.delays.duration.longDelay);
  }

  return (
  <>
    <TopBar text="Envelope #3: The Undefeated Rooster" isPuzzlePage={true} resetFunc={resetPuzzle} />
    {gameIsWon && <Confetti width={width} height={height} />}
    <RoosterRiddleDescription />
    <Fade in={true} mountOnEnter unmountOnExit
            timeout={theme.transitions.duration.longTextFade}
            style={{ transitionDelay: theme.delays.duration.longDelay}}
        >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexGrow: 1,
          justifyContent: "center",
          width: 'var(--pageWidthPercent)',
          position: "relative",
        }}
      > 
        {showResultScreen 
          ? 
            <RoosterRiddleResults gameIsWon={gameIsWon} /> 
          :
            <>
              <Stack
                direction="row"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "85%",
                  mb: "2em",
                  flexWrap: 'wrap'
                }}
              >
                {piles.map((pile, idx) => (
                  <Box key={idx} sx = {{display: "flex", position: "relative", width: {xs: "50%", md: "25%"}}}>
                    {/* A diabolical way to do this, change later */}
                    <Divider orientation="vertical"/>
                    <PileStack 
                      pileNum={idx} 
                      pileKernels = {pile} 
                      canBeSelectedFrom={selectedPile == null || selectedPile == idx} 
                      handleKernelClick={(selectedPile == null || selectedPile == idx) ? handleKernelClick: ()=>{}} 
                      selectedKernels={selectedKernels}
                      setSelectedKernels={setSelectedKernels}
                    />
                    <Divider orientation="vertical"/>
                  </Box> 
                ))}
              </Stack>
              <RoosterMoveDescription roosterMove={roosterMove}/>
              <Button sx={{mb: "1em"}} variant="contained" disabled={selectedKernels.size < 1} onClick={submitMove}>
                Submit Move
              </Button>
            </> }
      </Box>
    </Fade>
  </>
  )
}

export default RoosterRiddlePage