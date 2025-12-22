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
import BlackRabbit from "../../assets/whiteRabbit.png"
import Image from 'next/image'
import { standardTextFade } from "../_common/utils";
import { MouseEvent } from "react";

const EMPTY = 0;
const WHITE_RABBIT = 1;
const BLACK_RABBIT = 2;


interface props {
  rabbitPositions: number[];
  setRabbitPositions: (positions: number[]) => void

}

function Rabbits({rabbitPositions, setRabbitPositions}: props) {

  const moveRabbit = (idx: number, rabbitType: number) => {
    let newRabbitPositions = [...rabbitPositions];
    newRabbitPositions[idx] = EMPTY;
    if (rabbitType == WHITE_RABBIT) {
      if (newRabbitPositions[idx + 1] == EMPTY) {
        newRabbitPositions[idx + 1] =  WHITE_RABBIT
      }
      else {
        newRabbitPositions[idx + 2] = WHITE_RABBIT;
      }
    }
    else {
      if(newRabbitPositions[idx - 1] == EMPTY) {
        newRabbitPositions[idx - 1] = BLACK_RABBIT;
      }
      else {
        newRabbitPositions[idx - 2] = BLACK_RABBIT;
      }
    }
    setRabbitPositions(newRabbitPositions);
  }

  const drawSpace = (space: number, idx: number) => {
    if(space == WHITE_RABBIT) {
      const isMoveAvailable = isMoveAvailableForWhiteRabbit(idx);
      return (
        <Image 
          // key = {idx}
          src={WhiteRabbit} 
          alt="White Rabbit" 
          onClick = {isMoveAvailable ? () => moveRabbit(idx, WHITE_RABBIT) : undefined}
          style={{
            objectFit: "contain",
            width: "100%", 
            height: "100%",
            filter: isMoveAvailable ? 'drop-shadow(0px 0px 5px white)' : ''}} />
      )
    }
    else if(space == BLACK_RABBIT) {
      const isMoveAvailable = isMoveAvailableForBlackRabbit(idx);
      return (
        <Image 
          // key = {idx}
          src={BlackRabbit} 
          alt="Black Rabbit" 
          onClick = {isMoveAvailable ? () => moveRabbit(idx, BLACK_RABBIT) : undefined}
          style={{
            objectFit: "contain",
            width: "100%", 
            height: "100%",
            filter: isMoveAvailable ? 'drop-shadow(0px 0px 5px white)' : ''}} />
      )
    }
    return;
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
              sx={{height: "auto", display: "flex", alignItems: "center", justifyContent: "center"}}
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
