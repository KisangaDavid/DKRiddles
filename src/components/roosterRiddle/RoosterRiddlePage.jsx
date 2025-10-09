import { useState, useEffect } from 'react';
import { useWindowSize } from 'react-use';
import { useTheme } from '@mui/material/styles';
import { convertIterableToInt, convertIntToArray, MAX_32_BIT_NUM } from "../common/utils.js";

import RootBackground from "../common/RootBackground.jsx";
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
import TopBar from '../common/TopBar.jsx';

const NUM_BITS_PER_PILE = 4;
const NUM_PILES = 4;

function RoosterRiddlePage({wasmModule}) {
  const theme = useTheme();
  const [showResultScreen, setShowResultScreen] = useState(false);
  const [gameIsWon, setGameIsWon] = useState(false);
  const [piles, setPiles] = useState([]);
  const [selectedKernels, setSelectedKernels] = useState(new Set());
  const [selectedPile, setSelectedPile] = useState(null);
  const [roosterMove, setRoosterMove] = useState([null, null]);
  const {width, height} = useWindowSize();

  useEffect(() => {
    generateAndSetPiles();
  }, []);

  const generateAndSetPiles = () => {
    let pilesIntForm = wasmModule.exports.getInitialPiles(Math.floor(Math.random() * MAX_32_BIT_NUM));
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
    let roosterMove = wasmModule.exports.getRoosterRiddleMove(pilesIntRep, randSource);
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
  <RootBackground>
    <TopBar text="Envelope #3: The Undefeated Rooster" isHomePage={false} resetFunc={resetPuzzle} />
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
          flex: 1,
          justifyContent: "center",
          width: "75vw",
          position: "relative",
          mb: "1vh",
        }}
      > 
        {showResultScreen 
          ? 
            <RoosterRiddleResults gameIsWon={gameIsWon} /> 
          :
            <>
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
                  <Box key={idx} sx = {{display: "flex", position: "relative", overflow: "clip", flex: "1"}}>
                    <PileStack 
                      pileNum={idx} 
                      pileKernels = {pile} 
                      canBeSelectedFrom={selectedPile == null || selectedPile == idx} 
                      handleKernelClick={(selectedPile == null || selectedPile == idx) ? handleKernelClick: ()=>{}} 
                      selectedKernels={selectedKernels}
                      setSelectedKernels={setSelectedKernels}
                    />
                  </Box> 
                ))}
              </Stack>
              <RoosterMoveDescription roosterMove={roosterMove}/>
              <Button variant="contained" disabled={selectedKernels.size < 1} onClick={submitMove}>
                Submit Move
              </Button>
            </> }
      </Box>
    </Fade>
  </RootBackground>
  )
}

export default RoosterRiddlePage