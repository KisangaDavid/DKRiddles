import { useState, useCallback, useEffect } from "react";
import { useWindowSize } from "react-use";
import { useTheme } from "@mui/material/styles";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import HorseRiddleResults from "./HorseRiddleResults.jsx";
import RootBackground from "../common/RootBackground.jsx";
import PreviousRaces from "./PreviousRaces.jsx";
import TrifectaStack from "./TrifectaStack.jsx";
import Confetti from 'react-confetti'
import Box from "@mui/material/Box";
import TopBar from "../common/TopBar.jsx";
import HorseGridElement from "./HorseGridElement.jsx";

const HORSE_ORDER_CORRECT_CODE = 0;
const POTENTIAL_FASTER_HORSE_CODE = 1;
const DEFINITE_FASTER_HORSE_CODE = 2;
const NUM_HORSES = 25;
const RACE_LENGTH = 5;
const MAX_NUM_RACES = 15;
const MAX_32_BIT_NUM = 0xffffffff

const INVALID_HORSE_MSG = "Enter an integer between 1 and 25 for each position!";
const NO_DUP_HORSES_MSG = "You cannot enter the same horse in two different positions!";

function HorseRiddlePage({wasmModule}) {
    const [hasBeenReset, setHasBeenReset] = useState(false);
    const [confetti, setConfetti] = useState(false); 
    const [currentRace, setCurrentRace] = useState([]);
    const [finishedRaces, setFinishedRaces] = useState([]);
    const [correctAns, setCorrectAns] = useState(false);
    const [wrongReason, setWrongReason] = useState("");
    const [fastestHorses, setFastestHorses] = useState([null, null, null]);
    const {width, height} = useWindowSize();
    const theme = useTheme();

    useEffect(() => {
        wasmModule.exports.resetAndRandomizeHorses(Math.floor(Math.random() * MAX_32_BIT_NUM));
    }, []);

    const resetPuzzle = useCallback(() => {
        setCurrentRace([]); 
        setFinishedRaces([]);
        setCorrectAns(false);
        setConfetti(false);
        setWrongReason("");
        setFastestHorses([null, null, null]);
        setHasBeenReset(true);
        wasmModule.exports.resetAndRandomizeHorses(Math.floor(Math.random() * MAX_32_BIT_NUM)); 
    }, []);

  const addRemoveHorseToRace = (horseIdx) => {
    if (currentRace.includes(horseIdx)) {
      removeHorseFromRace(horseIdx);
    } else if (!currentRace.includes(horseIdx) && currentRace.length < RACE_LENGTH) {
      setCurrentRace((currentRace) => [...currentRace, horseIdx]);
    }
  };

  const removeHorseFromRace = (horseIdx) => {
    setCurrentRace((currentRace) =>
      currentRace.filter((idx) => idx != horseIdx)
    );
  };

    const validateTrifectaBet = () => {
        if (trifectaBetFilled) {
            if (fastestHorses.some(position => position > NUM_HORSES || position < 1)) {
                return INVALID_HORSE_MSG;
            }
            if (fastestHorses[0] == fastestHorses[1] || fastestHorses[1] == fastestHorses[2] || fastestHorses[2] == fastestHorses[0]) {
                return NO_DUP_HORSES_MSG;
            }
        }
        return "";
    };

    const updateFastestHorses = (horsePos, horseVal) => {
        setFastestHorses([...fastestHorses.slice(0, horsePos), horseVal, ...fastestHorses.slice(horsePos + 1)]);
    }

  const handleTrifectaChange = (e, horsePos) => {
    const intsOnly = e.target.value.replace(/[^0-9]/g, "");
    e.target.value = intsOnly;
    intsOnly.length < 1 ? updateFastestHorses(horsePos, null) : updateFastestHorses(horsePos, intsOnly);
  };

  // TODO: extract functions that convert vecs into ints and vice versa
  const submitRace = () => {
    let intRepHorsesToRace = 0;
    for (const horse of currentRace) {
      intRepHorsesToRace <<= 5;
      intRepHorsesToRace = intRepHorsesToRace | horse;
    }

    setCurrentRace([]);
    let intRes = wasmModule.exports.submitRace(intRepHorsesToRace);
    let horseOrder = [];
    for (let i = 0; i < RACE_LENGTH; i++) {
      horseOrder.push(intRes & 0x1f);
      intRes >>= 5;
    }
    setFinishedRaces([...finishedRaces, ...horseOrder.reverse()]);
    setWrongReason("");
  };

  const checkAnswer = () => {
    let horsesToSubmit = fastestHorses.map(num => num - 1).reverse();
    let horsesToSubmitInt = 0;
    for (const horse of horsesToSubmit) {
      horsesToSubmitInt <<= 5;
      horsesToSubmitInt |= horse;
    }
    let wasmAnsInt = wasmModule.exports.checkAnswer(horsesToSubmitInt);
    let wasmAnsVec = [];
    for (let i = 0; i < 3; i++) {
      wasmAnsVec.unshift((wasmAnsInt & 0x1f));
      wasmAnsInt >>= 5;
    }

    switch (wasmAnsVec[0]) {
      case HORSE_ORDER_CORRECT_CODE:
        setCorrectAns(true);
        break;
      case POTENTIAL_FASTER_HORSE_CODE:
        if (fastestHorses.indexOf(wasmAnsVec[1]) != 0 && fastestHorses.indexOf(wasmAnsVec[1]) < fastestHorses.indexOf(wasmAnsVec[2])) {
            setWrongReason(`With the current setup of races, horse ${wasmAnsVec[2]} could be faster than horse ${wasmAnsVec[1]}!`);
        } 
        setWrongReason(`With the current setup of races, horse ${wasmAnsVec[1]} could be faster than horse ${wasmAnsVec[2]}!`);
        break;
      case DEFINITE_FASTER_HORSE_CODE:
        setWrongReason(`With the current setup of races, horse ${wasmAnsVec[1]} is for sure faster than horse ${wasmAnsVec[2]}!`);
        break;
      default:
        setWrongReason("Something has gone terribly wrong. Please refresh the page!");
    }
  };

    let trifectaBetFilled = !fastestHorses.includes(null);
    let trifectaErrorMessage = validateTrifectaBet();
    // TODO: security guard pic on fail
  return (
    <RootBackground>
      <TopBar text="Envelope #2: The Horse Trifecta" isHomePage={false} resetFunc={resetPuzzle} />
      {confetti && <Confetti width={width} height={height}/>}
      <Fade in={true} mountOnEnter unmountOnExit timeout={theme.transitions.duration.standardTextFade}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "80vw",
            position: "relative",
            mb: "2vh",
          }}
        >
          <p>
            You tear open the second envelop and find a small purple flask
            alongside a note. The note reads:
            <br />
            <i>
              A Riddle Man must be bold and resourceful. Prove you are both by
              attaining $1 million dollars by sundown tomorrow. You may use the
              included potion of somnolence to aide you in this task.
            </i>{" "}
            <br /> <br />
            After quickly Googling somnolence, you come up with a brilliant plan:
            first, you'll sneak into the local racetrack with the help of the
            Riddeman's sleeping potion. Once inside, you'll race each horse and
            time them to determine the fastest three. The next day you'll place a
            winning trifecta bet (fastest 3 horses), which if you put your entire
            life savings into should result in a $1 million dollar payout!
            <br /> <br />
            You successfully sneak into the racetrack and are about to start
            timing horses when you discover you've forgotten your stopwatch at
            home! After some thinking, you realize you can still determine the
            fastest three horses by racing five horses at a time and marking down
            the order in which they finish. However, each additional race you set
            up increases the risk that the sleeping security guards will wake up.
            How can you determine the fastest three horses in the least amount of
            races?
          </p>
        </Box>
      </Fade>
      {!correctAns && 
        <Fade in={true} mountOnEnter unmountOnExit 
              timeout={theme.transitions.duration.longTextFade}
              style={{transitionDelay: hasBeenReset ? 0 : theme.delays.duration.longDelay}}
        >
          <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          width: "75vw",
          position: "relative",
          mb: "1vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "25vw",
            position: "relative",
            mb: "1vh",
          }}
        >
          Select 5 horses to race!
          <Grid
            container
            spacing={1}
            columns={5}
            direction="row"
            sx={{
              mt: "1vh",
              minHeight: "50%",
              display: "flex",
              width: "100%",
            }}
          >
            {[...Array(NUM_HORSES)].map((_, idx) => (
              <HorseGridElement
                key={idx}
                horseNumber={idx + 1}
                onClick={() => addRemoveHorseToRace(idx)}
              />
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "25vw",
            position: "relative",
            mb: "2vh",
            minHeight: "15vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              width: "25vw",
              minHeight: "15vh",
            }}
          >
            Current Race:
            <Grid
              container
              spacing={1}
              columns={5}
              direction="row"
              sx={{
                display: "flex",
                width: "80%",
                mt: "1vh",
              }}
            >
              {currentRace.map((horseIdx, idx) => (  
                <HorseGridElement
                  key={idx}
                  horseNumber={horseIdx + 1}
                  onClick={() => removeHorseFromRace(horseIdx)}
                />
              ))}
            </Grid>
          </Box>
          <Button
            variant="contained"
            onClick={() => submitRace()}
            disabled={currentRace.length != 5}
          >
            Race Horses!
          </Button>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "22vw",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              bottom: "0",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                position: "relative",
                mb: "2vh",
              }}
            >
              <p>{trifectaErrorMessage.length === 0 ? wrongReason : trifectaErrorMessage}</p>
            </Box>
            <TrifectaStack handleTrifectaChange={handleTrifectaChange}/>
                <Button
      variant="contained"
      disabled={!trifectaBetFilled || trifectaErrorMessage !== ""}
      onClick={checkAnswer}
    >
      Place Trifecta Bet
    </Button>
          </Box>
        </Box>
        <PreviousRaces
          finishedRaces={finishedRaces}
          MAX_NUM_RACES={MAX_NUM_RACES}
          RACE_LENGTH={RACE_LENGTH}
        />

            </Box>
      </Fade>}
      <Box sx={{display: "flex", flexGrow: 1, width: "75vw", alignItems: "center"}}> 
      {correctAns && <HorseRiddleResults numRaces={finishedRaces.length / RACE_LENGTH} setConfetti={setConfetti}/>}
      </Box>
  </RootBackground>
  );
}

export default HorseRiddlePage;