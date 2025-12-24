'use client'

import { useState, useEffect, useContext } from 'react';
import { 
  convertIterableToInt, 
  convertIntToArray,
  MAX_32_BIT_NUM, 
  useConfettiSize, 
  longTextFade,
  WasmContext, 
  longDelay
} from "../_common/utils";
import Confetti from "react-confetti";
import RabbitRiddleDescription from './rabbitRiddleDescription';
import Rabbits from './rabbits'
import TopBar from '../_common/TopBar';
import Solved from './solved';
import Fade from '@mui/material/Fade';

function RabbitRiddlePage() {
  const startingRabbitPositions = [1,1,1,0,2,2,2];
  const endingRabbitPositions = [2,2,2,0,1,1,1];
  const [rabbitPositions, setRabbitPositions] = useState(startingRabbitPositions);
  const [confettiWidth, confettiHeight] = useConfettiSize();

  const resetPuzzle = () => {
    setRabbitPositions(startingRabbitPositions)
  }

  const solved = rabbitPositions.every((val, idx) => val === endingRabbitPositions[idx])
  console.log(solved)
  return (
  <>
    <TopBar
      text="Envelope #4: Jumping Rabbits"
      isPuzzlePage={true}
      resetFunc={resetPuzzle}
    />
    {solved && <Confetti width={confettiWidth} height={confettiHeight} />}
    <RabbitRiddleDescription />
    <Rabbits rabbitPositions = {rabbitPositions} setRabbitPositions={setRabbitPositions}/>
    <Fade in={solved} mountOnEnter unmountOnExit>
      <Solved />
    </Fade>

  </>
  )
}

export default RabbitRiddlePage