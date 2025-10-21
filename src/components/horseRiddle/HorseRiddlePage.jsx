import { useState, useCallback, useEffect } from "react";
import { useWindowSize } from "react-use";
import { useTheme } from "@mui/material/styles";
import { convertIterableToInt, convertIntToArray, MAX_32_BIT_NUM } from "../common/utils.js";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import HorseRiddleResults from "./HorseRiddleResults.jsx";
import RootBackground from "../common/RootBackground.jsx";
import PreviousRaces from "./PreviousRaces.jsx";
import TrifectaStack from "./TrifectaStack.jsx";
import HorseRiddleDescription from "./HorseRiddleDescription.jsx";
import Confetti from "react-confetti";
import Box from "@mui/material/Box";
import TopBar from "../common/TopBar.jsx";
import HorseGridElement from "./HorseGridElement.jsx";

const HORSE_ORDER_CORRECT_CODE = 0;
const POTENTIAL_FASTER_HORSE_CODE = 1;
const DEFINITE_FASTER_HORSE_CODE = 2;
const NUM_HORSES = 25;
const RACE_LENGTH = 5;
const MAX_NUM_RACES = 15;
const NUM_BITS_PER_HORSE = 5;

const INVALID_HORSE_MSG = "Enter an integer between 1 and 25 for each position!";
const NO_DUP_HORSES_MSG = "You cannot enter the same horse in two different positions!";

function HorseRiddlePage({ wasmModule }) {
  const [hasBeenReset, setHasBeenReset] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [currentRace, setCurrentRace] = useState([]);
  const [finishedRaces, setFinishedRaces] = useState([]);
  const [correctAns, setCorrectAns] = useState(false);
  const [wrongReason, setWrongReason] = useState("");
  const [fastestHorses, setFastestHorses] = useState([null, null, null]);
  const { width, height } = useWindowSize();
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
      if (fastestHorses.some((position) => position > NUM_HORSES || position < 1)) {
        return INVALID_HORSE_MSG;
      }
      if (fastestHorses[0] == fastestHorses[1] || 
        fastestHorses[1] == fastestHorses[2] ||
        fastestHorses[2] == fastestHorses[0]) {
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

  const submitRace = () => {
    let intRepHorsesToRace = convertIterableToInt(currentRace, NUM_BITS_PER_HORSE);
    let intRes = wasmModule.exports.submitRace(intRepHorsesToRace);
    let horseOrder = convertIntToArray(intRes, NUM_BITS_PER_HORSE, RACE_LENGTH);
    setCurrentRace([]);
    setFinishedRaces([...finishedRaces, ...horseOrder.reverse()]);
    setWrongReason("");
  };

  const checkAnswer = () => {
    let horsesToSubmit = fastestHorses.map((num) => num - 1).reverse();
    let horsesToSubmitInt = convertIterableToInt(horsesToSubmit,NUM_BITS_PER_HORSE);
    let intRes = wasmModule.exports.checkHorseRiddleAnswer(horsesToSubmitInt);
    let resVec = convertIntToArray(intRes, NUM_BITS_PER_HORSE, 3);

    switch (resVec[0]) {
      case HORSE_ORDER_CORRECT_CODE:
        setCorrectAns(true);
        break;
      case DEFINITE_FASTER_HORSE_CODE:
        setWrongReason(`With the current setup of races, horse ${resVec[1]} is for sure faster than horse ${resVec[2]}!`);
        break;
      case POTENTIAL_FASTER_HORSE_CODE:
        if (fastestHorses.indexOf(resVec[1]) != 0 && fastestHorses.indexOf(resVec[1]) < fastestHorses.indexOf(resVec[2])) {
          setWrongReason(`With the current setup of races, horse ${resVec[2]} could be faster than horse ${resVec[1]}!`);
        }
        else {
          setWrongReason(`With the current setup of races, horse ${resVec[1]} could be faster than horse ${resVec[2]}!`);
        }
        break;
      default:
        setWrongReason("Something has gone terribly wrong. Please refresh the page!");
    }
  };

  let trifectaBetFilled = !fastestHorses.includes(null);
  let trifectaErrorMessage = validateTrifectaBet();
  
  return (
    <RootBackground>
      <TopBar
        text="Envelope #2: The Horse Trifecta"
        isPuzzlePage={true}
        resetFunc={resetPuzzle}
      />
      {confetti && <Confetti width={width} height={height} />}
      <HorseRiddleDescription />
      {!correctAns && (
        <Fade
          in={true}
          mountOnEnter
          unmountOnExit
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
              mb: "1vh"
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
                columnSpacing={2}
                rowSpacing={1}
                columns={5}
                direction="row"
                sx={{
                  mt: "1vh",
                  display: "flex",
                  width: "100%",
                }}
              >
                {[...Array(NUM_HORSES)].map((_, idx) => (
                  <HorseGridElement
                    key={idx}
                    horseNumber={idx + 1}
                    selected={currentRace.includes(idx)}
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
                  <p>
                    {trifectaErrorMessage.length === 0? wrongReason : trifectaErrorMessage}
                  </p>
                </Box>
                <TrifectaStack handleTrifectaChange={handleTrifectaChange} />
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
        </Fade>
      )}
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          overflow: "hidden",
          width: "75vw",
          alignItems: "center",
        }}
      >
        {correctAns && (
          <HorseRiddleResults
            numRaces={finishedRaces.length / RACE_LENGTH}
            setConfetti={setConfetti}
          />
        )}
      </Box>
    </RootBackground>
  );
}

export default HorseRiddlePage;
