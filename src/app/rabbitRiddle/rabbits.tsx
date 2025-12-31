import Grid from "@mui/material/Grid";
import Slide from "@mui/material/Slide";
import WhiteRabbit from "../../assets/whiteRabbit.png"
import BlackRabbit from "../../assets/blackRabbit.png"
import Image from 'next/image'
import { standardDelay } from "../_common/utils";

const EMPTY = 0;
const WHITE_RABBIT = 1;
const BLACK_RABBIT = 2;

interface props {
  prevMoveRabbit: number;
  prevMoveJump: boolean;
  movedTo: number;
  rabbitPositions: number[];
  moveRabbit: (idx: number, space: number) => void;
}

function Rabbits({prevMoveRabbit, prevMoveJump, movedTo, rabbitPositions, moveRabbit}: props) {

  const getSlideDirection = (idx: number, rabbitType: number) => {
    if (rabbitType == WHITE_RABBIT && (idx > 0 && rabbitPositions[idx - 1] == EMPTY)) {
      console.log(`idx ${idx} with rabbitType ${rabbitType} moves right 1`)
      return "right";
    }
    if (rabbitType == BLACK_RABBIT && (idx < rabbitPositions.length && rabbitPositions[idx + 1] == EMPTY)) {
      console.log(`idx ${idx} with rabbitType ${rabbitType} moves left 1`)
      return "left";
    }
    if (rabbitType == EMPTY) {
      const now = new Date()
      console.log(now.toLocaleString());
      console.log("prevMoveJump:" + prevMoveJump);
      if (prevMoveRabbit == WHITE_RABBIT && !prevMoveJump) {
        console.log("prev move jump: " + prevMoveJump);
        console.log(`idx ${idx} with rabbitType ${rabbitType} moves left 2`)
        return "left";
      }
      if (prevMoveRabbit == BLACK_RABBIT && !prevMoveJump) {
        console.log(`idx ${idx} with rabbitType ${rabbitType} moves right 2`)
        return "right";
      }
    }
    console.log(`idx ${idx} with rabbitType ${rabbitType} moves down`)
    return "down";
  }

  const drawSpace = (space: number, idx: number) => {
    const isMoveAvailable = isMoveAvailableForRabbit(idx, space);
    return (
      <Slide 
        in={rabbitPositions[idx] != EMPTY} 
        mountOnEnter 
        unmountOnExit 
        direction={getSlideDirection(idx, space)} 
        timeout={standardDelay}
      > 
        <Image 
          src={getRabbitImage(space)} 
          alt="Rabbit" 
          onClick = {isMoveAvailable ? () => moveRabbit(idx, space) : undefined}
          style={{
            objectFit: "contain",
            width: "100%", 
            height: "100%",
            filter: isMoveAvailable ? 'drop-shadow(0px 0px 5px white)' : '',
            cursor: isMoveAvailable ? 'pointer' : 'default',
          }}
        />
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
    return (idx < rabbitPositions.length && rabbitPositions[idx + 1] == EMPTY) || 
           (idx < rabbitPositions.length && rabbitPositions[idx + 2] == EMPTY);
  }

  const isMoveAvailableForBlackRabbit = (idx: number) => {
    return (idx > 0 && rabbitPositions[idx - 1] == EMPTY) || 
           (idx > 1  && rabbitPositions[idx - 2] == EMPTY);
  }

  return ( 
       <Grid
          container
          columnSpacing={{xs: "0.25em", md: "1em"}}
          columns={rabbitPositions.length}
          style={{ width: "90%", height: "auto"}}
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
  );
}

export default Rabbits;
