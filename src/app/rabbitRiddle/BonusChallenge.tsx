import Grid from "@mui/material/Grid";
import Slide from "@mui/material/Slide";
import WhiteRabbit from "../../assets/whiteRabbit.png"
import BlackRabbit from "../../assets/blackRabbit.png"
import Image from 'next/image'
import { getRandomInt, RABBIT_PUZZLE_P2, SOLVED, SolvedPuzzlesContext, standardDelay, standardTextFade, WasmContext } from "../_common/utils";
import SendIcon from "@mui/icons-material/Send";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Zoom, Fab, Fade } from "@mui/material";
import BonusSubmitted from "./BonusSubmitted";

const MIN_NUMBER_BONUS_RABBITS = 6;
const MAX_NUMBER_BONUS_RABBITS = 12;

interface props {
  setConfetti: (on: boolean) => void;
}

function BonusChallenge({setConfetti} : props) {

    const [numBonusRabbits, setNumBonusRabbits] = useState(-1);
    const [answerToBonus, setAnswerToBonus] = useState(-1);
    const [bonusAnswerSubmitted, setBonusAnswerSubmitted] = useState(false);
    const [bonusAnswerRight, setBonusAnswerRight] = useState(false);
    const {wasmExports} = useContext(WasmContext);
      const { solvedPuzzles, setSolvedPuzzles } = useContext(SolvedPuzzlesContext);

    useEffect(() => {
      if (numBonusRabbits === -1 ) {
        setNumBonusRabbits(getRandomInt(MIN_NUMBER_BONUS_RABBITS, MAX_NUMBER_BONUS_RABBITS));
      }
    }, []);

    // TODO: make updating local storage and adding a puzzle to context a util function?
    const submitBonusAnswer = () => {
      if ((wasmExports?.checkRabbitBonusAnswer as Function)(numBonusRabbits, answerToBonus)) {
        localStorage.setItem(RABBIT_PUZZLE_P2, SOLVED);
        const newSolvedPuzzles = new Set(solvedPuzzles);
        newSolvedPuzzles.add(RABBIT_PUZZLE_P2);
        setSolvedPuzzles(newSolvedPuzzles);
        setBonusAnswerSubmitted(true);
        setBonusAnswerRight(true);
        setConfetti(true);
      }
      else {
        setBonusAnswerSubmitted(true);
      }
  };
    
    const handleBonusAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
      const intsOnly = e.target.value.replace(/[^0-9]/g, "");
      e.target.value = intsOnly;
      intsOnly.length < 1 ? setAnswerToBonus(-1) : setAnswerToBonus(+intsOnly);
      console.log(answerToBonus);
    };

  return ( 
    <>
    {!bonusAnswerSubmitted && 
      <Fade 
          in={true}
          mountOnEnter
          unmountOnExit
          timeout={standardTextFade}
        >
          <Box>
            <p>
              As the last rabbit hops into place, they all suddenly disappear in a familiar puff of smoke. 
              In their place is a note smelling faintly of carrots. The note reads: <br />
              <br />
              <i>
                Spectacular, my rabbits are rearranged! Now, imagine that instead of 3 
                rabbits of each color, there were {numBonusRabbits} rabbits of each color. 
                How many moves (i.e. clicks) would it take to rearrange them in the same 
                fashion as before? Write your answer below:
              </i>
            </p>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box sx={{ textAlign: "center", position: "relative" }}>
                <TextField
                    sx={{}}
                    id="bonusAnswer"
                    variant="outlined"
                    size="small"
                    autoComplete="off"
                    label="Number of moves"
                    onChange={handleBonusAnswerChange}
                />
                <Box
                    style={{
                    position: "absolute",
                    right: -50,
                    top: 0,
                    width: "40px",
                    }}
                >
                  <Zoom in={answerToBonus != -1} mountOnEnter unmountOnExit>
                    <Fab
                        color="primary"
                        size="small"
                        onClick={() => submitBonusAnswer()}
                    >
                      <SendIcon />
                    </Fab>
                  </Zoom>
                </Box>
              </Box>
            </Box>
          </Box>
      </Fade>
    }
    {bonusAnswerSubmitted && 
      <Fade 
        in={true}
        mountOnEnter
        unmountOnExit
        timeout={standardTextFade}
      >
        <Box>
          <BonusSubmitted answerCorrect = {bonusAnswerRight}/>
        </Box>
      </Fade>
    }
    </>
  );
}

export default BonusChallenge;
