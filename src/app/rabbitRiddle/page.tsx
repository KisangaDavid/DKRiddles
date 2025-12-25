'use client'

import { useContext, useState } from 'react';
import { useConfettiSize, standardDelay, SolvedPuzzlesContext, RABBIT_PUZZLE, SOLVED} from "../_common/utils";
import Confetti from "react-confetti";
import RabbitRiddleDescription from './rabbitRiddleDescription';
import Rabbits from './rabbits'
import TopBar from '../_common/TopBar';
import Solved from './solved';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import BreakdownUnlockedNotification from '../_common/BreakdownUnlockedNotification';

const EMPTY = 0;
const WHITE_RABBIT = 1;
const BLACK_RABBIT = 2;
const startingRabbitPositions = [1,1,1,0,2,2,2];
const endingRabbitPositions = [2,2,2,0,1,1,1];
// TODO: black / white rabbits
function RabbitRiddlePage() {
  const [rabbitPositions, setRabbitPositions] = useState(startingRabbitPositions);
  const [prevMoveRabbit, setPrevMoveRabbit] = useState(WHITE_RABBIT);
  const [movedTo, setMovedTo] = useState(-1)
  const [prevMoveJump, setPrevMoveJump] = useState(false);
  const [solved, setSolved] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(true);
  const { solvedPuzzles, setSolvedPuzzles } = useContext(SolvedPuzzlesContext);
  const [confettiWidth, confettiHeight] = useConfettiSize();

  const moveRabbit = (idx: number, rabbitType: number) => {
    let newRabbitPositions = [...rabbitPositions];
    let jump = false;
    let movedTo = -1;
    newRabbitPositions[idx] = EMPTY;
    if (rabbitType == WHITE_RABBIT) {
      if (newRabbitPositions[idx + 1] == EMPTY) {
        newRabbitPositions[idx + 1] =  WHITE_RABBIT;
        movedTo = idx + 1;
      }
      else {
        newRabbitPositions[idx + 2] = WHITE_RABBIT;
        movedTo = idx + 2;
        jump = true;
      }
    }
    else {
      if(newRabbitPositions[idx - 1] == EMPTY) {
        newRabbitPositions[idx - 1] = BLACK_RABBIT;
        movedTo = idx - 1;
      }
      else {
        newRabbitPositions[idx - 2] = BLACK_RABBIT;
        movedTo = idx - 2;
        jump = true;
      }
    }
    setPrevMoveJump(jump);
    setRabbitPositions(newRabbitPositions);
    setPrevMoveRabbit(rabbitType);
    setMovedTo(movedTo);
  }

  const resetPuzzle = () => {
    setRabbitPositions(startingRabbitPositions);
    setPrevMoveJump(false);
    setPrevMoveRabbit(WHITE_RABBIT);
    setMovedTo(-1);
    setNotificationOpen(true);
    setSolved(false);
  }

  if(rabbitPositions.every((val, idx) => val === endingRabbitPositions[idx])) {
    
    setTimeout(() => {
      localStorage.setItem(RABBIT_PUZZLE, SOLVED);
      const newSolvedPuzzles = new Set(solvedPuzzles);
      newSolvedPuzzles.add(RABBIT_PUZZLE);
      setSolvedPuzzles(newSolvedPuzzles);
      setSolved(true);
    }, standardDelay);
  }

  return (
  <>
    <TopBar
      text="Envelope #4: Jumping Rabbits"
      isPuzzlePage={true}
      resetFunc={resetPuzzle}
    />
    {solved && (
      <>
        <Confetti width={confettiWidth} height={confettiHeight} /> 
        <BreakdownUnlockedNotification
          open={notificationOpen}
          onClose={() => setNotificationOpen(false)}
          text="Rabbit Puzzle Breakdown Unlocked!"
        />
      </>
    )}
    <RabbitRiddleDescription />
    <Rabbits 
      rabbitPositions={rabbitPositions} 
      prevMoveRabbit={prevMoveRabbit} 
      prevMoveJump={prevMoveJump} 
      movedTo={movedTo}
      moveRabbit={moveRabbit}
    />
      <Fade in={solved}>
        <Box sx={{display: "flex", flexGrow: 1, alignItems: "center"}}>
          <Solved />
        </Box>
      </Fade>
  </>
  )
}

export default RabbitRiddlePage