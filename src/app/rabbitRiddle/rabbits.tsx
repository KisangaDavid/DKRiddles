import emptyHouse from "../../assets/emptyHouse.svg";
import rat from "../../assets/rat.png";
import ratTrap from "../../assets/ratTrap.svg";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Slide from "@mui/material/Slide";
import Fade from '@mui/material/Fade'
import Zoom from "@mui/material/Zoom";
import Box from "@mui/material/Box";
import WhiteRabbit from "../../assets/whiteRabbit.png"
import BlackRabbit from "../../assets/emptyHouse.svg"
import Image from 'next/image'
import { shortImageFade, standardTextFade } from "../_common/utils";
import { MouseEvent, useState } from "react";

const EMPTY = 0;
const WHITE_RABBIT = 1;
const BLACK_RABBIT = 2;


interface props {
  rabbitPositions: number[];
  setRabbitPositions: (positions: number[]) => void
}

function Rabbits({rabbitPositions, setRabbitPositions}: props) {
  const [prevMoveRabbit, setPrevMoveRabbit] = useState(WHITE_RABBIT);
  const [prevMoveJump, setPrevMoveJump] = useState(false);
  
  const moveRabbit = (idx: number, rabbitType: number) => {
    let newRabbitPositions = [...rabbitPositions];
    let jump = false;
    newRabbitPositions[idx] = EMPTY;
    if (rabbitType == WHITE_RABBIT) {
      if (newRabbitPositions[idx + 1] == EMPTY) {
        newRabbitPositions[idx + 1] =  WHITE_RABBIT
      }
      else {
        newRabbitPositions[idx + 2] = WHITE_RABBIT;
        jump = true;
      }
    }
    else {
      if(newRabbitPositions[idx - 1] == EMPTY) {
        newRabbitPositions[idx - 1] = BLACK_RABBIT;
      }
      else {
        newRabbitPositions[idx - 2] = BLACK_RABBIT;
        jump = true;
      }
    }
    setRabbitPositions(newRabbitPositions);
    setPrevMoveRabbit(rabbitType);
    setPrevMoveJump(jump);
  }

  const getSlideDirection = (idx: number, rabbitType: number) => {
    if (rabbitType == WHITE_RABBIT && (idx > 0 && rabbitPositions[idx - 1] == EMPTY)) {
      return "right";
    }
    if (rabbitType == BLACK_RABBIT && (idx < rabbitPositions.length && rabbitPositions[idx + 1] == EMPTY)) {
      return "left";
    }
    if (rabbitType == EMPTY) {
      if (prevMoveRabbit == WHITE_RABBIT && !prevMoveJump) {
        return "left";
      }
      if (prevMoveRabbit == BLACK_RABBIT && !prevMoveJump) {
        return "right";
      }
    }
    return "down";
  }
  const drawSpace = (space: number, idx: number) => {

    const isMoveAvailable = isMoveAvailableForRabbit(idx, space);
    return (
      <Slide in={rabbitPositions[idx] != EMPTY} direction={getSlideDirection(idx, space)} timeout={shortImageFade}> 
        <Image 
          src={getRabbitImage(space)} 
          alt="Rabbit" 
          onClick = {isMoveAvailable ? () => moveRabbit(idx, space) : undefined}
          style={{
            objectFit: "contain",
            width: "100%", 
            height: "100%",
            filter: isMoveAvailable ? 'drop-shadow(0px 0px 5px white)' : ''}} />
      </Slide>
    )
  }

  const getRabbitImage = (rabbitType: number) => {
    switch (rabbitType) {
      case WHITE_RABBIT:
        return WhiteRabbit;
      case BLACK_RABBIT:
        return BlackRabbit;
      case EMPTY:
        return prevMoveRabbit == WHITE_RABBIT ? WhiteRabbit : BlackRabbit

    }

  }

  const isMoveAvailableForRabbit = (idx: number, rabbitType: number) => {
    if (rabbitType == WHITE_RABBIT) {
      return isMoveAvailableForWhiteRabbit(idx);
    }
    else {
      return isMoveAvailableForBlackRabbit(idx);
    }
  }
  const isMoveAvailableForWhiteRabbit = (idx: number) => {
    return (idx < rabbitPositions.length && rabbitPositions[idx + 1] == EMPTY)
            || (idx < rabbitPositions.length && rabbitPositions[idx + 2] == EMPTY);
  }

  const isMoveAvailableForBlackRabbit = (idx: number) => {
    return (idx > 0 && rabbitPositions[idx - 1] == EMPTY)
            || (idx > 1  && rabbitPositions[idx - 2] == EMPTY);
  }

  return ( 
    <>
       <Grid
          container
          columnSpacing={{xs: "0.25em", md: "1em"}}
          columns={rabbitPositions.length}
          style={{ width: "100%", height: "auto"}}
      >
        {rabbitPositions.map((space, index) => (
          <Grid size={1}
              sx={{height: "auto", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden"}}
              key={index}
          >
            {drawSpace(space, index)}   
          </Grid>
        ))}
      </Grid>
</>
  );
}

export default Rabbits;
