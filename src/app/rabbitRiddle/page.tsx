'use client'

import { useContext, useState } from 'react';
import { useConfettiSize, standardDelay, SolvedPuzzlesContext, RABBIT_PUZZLE_P1, RABBIT_PUZZLE_P2, SOLVED} from "../_common/utils";
import Confetti from "react-confetti";
import RabbitRiddleDescription from './rabbitRiddleDescription';
import Rabbits from './rabbits'
import TopBar from '../_common/TopBar';
import Box from '@mui/material/Box';
import BreakdownUnlockedNotification from '../_common/BreakdownUnlockedNotification';
import BonusChallenge from './BonusChallenge';

const EMPTY = 0;
const WHITE_RABBIT = 1;
const BLACK_RABBIT = 2;
const startingRabbitPositions = [1,1,1,0,2,2,2];
const endingRabbitPositions = [2,2,2,0,1,1,1];

function RabbitRiddlePage() {
  const [rabbitPositions, setRabbitPositions] = useState(startingRabbitPositions);
  const [prevMoveRabbit, setPrevMoveRabbit] = useState(WHITE_RABBIT);
  const [movedTo, setMovedTo] = useState(-1)
  const [prevMoveJump, setPrevMoveJump] = useState(false);
  const [p1Solved, setP1Solved] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(true);
  const [confetti, setConfetti] = useState(false);
  const [confettiWidth, confettiHeight] = useConfettiSize();
  const { solvedPuzzles, setSolvedPuzzles } = useContext(SolvedPuzzlesContext);


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
    checkWin(newRabbitPositions);
  }

  const checkWin = (newRabbitPositions: number[]) => {
    if(newRabbitPositions.every((val, idx) => val === endingRabbitPositions[idx])) {
      setTimeout(() => {
        localStorage.setItem(RABBIT_PUZZLE_P1, SOLVED);
        const newSolvedPuzzles = new Set(solvedPuzzles);
        newSolvedPuzzles.add(RABBIT_PUZZLE_P1);
        setSolvedPuzzles(newSolvedPuzzles);
        setP1Solved(true);
      }, standardDelay);
    }
  }

  const resetPuzzle = () => {
    setP1Solved(false);
    setRabbitPositions(startingRabbitPositions);
    setPrevMoveJump(false);
    setPrevMoveRabbit(WHITE_RABBIT);
    setMovedTo(-1);
    setNotificationOpen(true);
    setConfetti(false);
  }

  return (
  <>
    <TopBar
      text="Envelope #4: Jumping Rabbits"
      isPuzzlePage={true}
      resetFunc={resetPuzzle}
    />
    {confetti && <Confetti width={confettiWidth} height={confettiHeight} />} 
    <RabbitRiddleDescription />
    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", my: {
      xs: "3em",
      md: "6em"
    } }}>
      <Rabbits 
        rabbitPositions={rabbitPositions} 
        prevMoveRabbit={prevMoveRabbit} 
        prevMoveJump={prevMoveJump} 
        movedTo={movedTo}
        moveRabbit={moveRabbit}
      />
    </Box>
      {p1Solved && (
      <>
        <BreakdownUnlockedNotification
          open={notificationOpen}
          onClose={() => setNotificationOpen(false)}
          text="Rabbit Puzzle Breakdown Part 1 Unlocked!"
        />
        <BonusChallenge setConfetti={setConfetti}/>
      </>
    )}
    {/* {p1Solved && p2Solved && (
      <Fade in={true} mountOnEnter unmountOnExit>
        <Box sx={{display: "flex", mt: {xs: "2em", md: "5em"}}}>
          <BonusSubmitted answerCorrect={}/>
        </Box>
      </Fade>
    )}   */}
  </>
  )
}

export default RabbitRiddlePage