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
import RabbitRiddleDescription from './rabbitRiddleDescription';
import Rabbits from './rabbits'
import TopBar from '../_common/TopBar';

function RabbitRiddlePage() {
  const startingRabbitPositions = [1,1,1,0,2,2,2];
  const endingRabbitPositions = [2,2,2,0,1,1,1];
  const [rabbitPositions, setRabbitPositions] = useState(startingRabbitPositions);

  const resetPuzzle = () => {
    setRabbitPositions(startingRabbitPositions)
  }



  return (
  <>
    <TopBar
      text="Envelope #4: RABBIT PLACEHOLDER"
      isPuzzlePage={true}
      resetFunc={resetPuzzle}
    />
    <RabbitRiddleDescription />
    <Rabbits rabbitPositions = {rabbitPositions} setRabbitPositions={setRabbitPositions}/>

  </>
  )
}

export default RabbitRiddlePage