'use client'

import { useState, useEffect, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import { 
  convertIterableToInt, 
  convertIntToArray,
  MAX_32_BIT_NUM, 
  useConfettiSize, 
  longTextFade,
  WasmContext, 
  longDelay
} from "../_common/utils";
import RoosterRiddleDescription from './RoosterRiddleDescription';
import RoosterMoveDescription from './RoosterMoveDescription';
import RoosterRiddleResults from './RoosterRiddleResults';
import PileStack from './PileStack';
import Confetti from 'react-confetti'
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Box from "@mui/material/Box";
import TopBar from '../_common/TopBar';

const NUM_BITS_PER_PILE = 4;
const NUM_PILES = 4;

function RoosterRiddlePage() {
  const [showResultScreen, setShowResultScreen] = useState(false);
  const [gameIsWon, setGameIsWon] = useState(false);
  const [piles, setPiles] = useState<number[][]>([[]]);
  const [selectedKernels, setSelectedKernels] = useState(new Set<number>());
  const [selectedPile, setSelectedPile] = useState(-1);
  const [roosterMove, setRoosterMove] = useState<[number, number[]]>([-1, [-1]]);
  const [confettiWidth, confettiHeight] = useConfettiSize();
  const {wasmExports} = useContext(WasmContext);

  useEffect(() => {
      generateAndSetPiles();
  }, [wasmExports]);

  const generateAndSetPiles = () => {
    let pilesIntForm = getPilesIntForm();
    let piles = convertIntToArray(pilesIntForm, NUM_BITS_PER_PILE, NUM_PILES); // TODO: check null value somewhere
    let pilesToSet = piles.map(pile => 
      Array.from({ length: pile }, (_, i) => i)
    );
    setPiles(pilesToSet);
  };

  const handleKernelClick = (idx: number, pileNum: number) => {
    if (selectedKernels.has(idx)) {
      const newSet = new Set(selectedKernels);
      newSet.delete(idx);
      if (newSet.size == 0) {
        setSelectedPile(-1);
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
    let roosterMove = getRoosterRiddleMove(pilesIntRep, randSource);
    let [numToTake, pileToTakeFrom] = convertIntToArray(roosterMove, NUM_BITS_PER_PILE, 2);
    setPiles(pilesPostPlayerMove);
    setSelectedKernels(new Set());
    setSelectedPile(-1);
    setTimeout(() => {
      executeRoosterMove(pileToTakeFrom, numToTake, pilesPostPlayerMove);;
    }, longDelay);
  }

  const executeRoosterMove = (pileToTakeFrom: number, numToTake: number, pilesPostPlayerMove: Array<Array<number>>) => {
    setRoosterMove([pileToTakeFrom, pilesPostPlayerMove[pileToTakeFrom].slice(-numToTake)]);
    let pileAfterRoosterRemoval = pilesPostPlayerMove[pileToTakeFrom].slice(0, -numToTake);
    setPiles([...pilesPostPlayerMove.slice(0, pileToTakeFrom), pileAfterRoosterRemoval, ...pilesPostPlayerMove.slice(pileToTakeFrom + 1)]);
  }

  const resetPuzzle = () => {
    generateAndSetPiles()
    setShowResultScreen(false);
    setGameIsWon(false);
    setSelectedKernels(new Set());
    setSelectedPile(-1);
    setRoosterMove([-1, [-1]]);
  }

  const getPilesIntForm = () => {
    let piles = null;
    if (wasmExports != null) {
      piles = (wasmExports.getInitialPiles as Function)(Math.floor(Math.random() * MAX_32_BIT_NUM));
    }
    return piles;
  }

  const getRoosterRiddleMove = (pilesIntRep: number, randSource: number) => {
    let roosterMove = null;
    if (wasmExports != null) {
      roosterMove = (wasmExports.getRoosterRiddleMove as Function)(pilesIntRep, randSource)
    }
    return roosterMove
  }

  if (piles.length === NUM_PILES && piles.reduce((a, b) => a + b.length, 0) == 0) {
    setTimeout(() => {
      setShowResultScreen(true);
    }, longDelay);
  }

  return (
  <>
    <TopBar text="Envelope #3: The Undefeated Rooster" isPuzzlePage={true} resetFunc={resetPuzzle} />
    {gameIsWon && <Confetti width={confettiWidth} height={confettiHeight} />}
    <RoosterRiddleDescription />
    <Fade in={true} mountOnEnter unmountOnExit
            timeout={longTextFade}
            style={{ transitionDelay: longDelay + 'ms'}}
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
                      canBeSelectedFrom={selectedPile == -1 || selectedPile == idx} 
                      handleKernelClick={(selectedPile == -1 || selectedPile == idx) ? handleKernelClick: ()=>{}} 
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