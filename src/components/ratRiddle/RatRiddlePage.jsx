import { useState, useCallback } from 'react';
import { useWindowSize } from 'react-use';
import { useTheme } from '@mui/material/styles';

import RootBackground from "../common/RootBackground.jsx";
import RowOfHouses from './RowOfHouses.jsx';
import SolvedStack from './SolvedStack.jsx';
import UnsolvedStack from './UnsolvedStack.jsx';
import RatRiddleDescription from './RatRiddleDescription.jsx';
import Confetti from 'react-confetti'
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Box from "@mui/material/Box";
import TopBar from '../common/TopBar.jsx';

const NUM_HOUSES = 8;

function RatRiddlePage({wasmModule}) {
  const [submittedTraps, setSubmittedTraps] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [path, setPath] = useState([]);
  const [curDay, setCurDay] = useState(0);
  const [prevDay, setPrevDay] = useState(null);
  const [totalDays, setTotalDays] = useState(0);
  const [allCheckedHouses, setAllCheckedHouses] = useState([]);
  const [curCheckedHouses, setCurCheckedHouses] = useState(new Set());
  const {width, height} = useWindowSize();
  const theme = useTheme();

  const solved = path.length == 0;

  const trapHouse = (index) => {
    const newSet = new Set(curCheckedHouses);
    if (newSet.has(index)) {
      newSet.delete(index);
    }
    else {
      if (newSet.size < 2) {
        newSet.add(index);
      }
    }
    setCurCheckedHouses(newSet);
  };

  const nextDay = () => {
    setCurDay(curDay + 1)
    setAllCheckedHouses(allCheckedHouses.concat(curCheckedHouses));
    setCurCheckedHouses(new Set());
};

  const submitRiddleAnswer = () => {
    let allCheckedPositions = convertToAbsPos(allCheckedHouses.concat(curCheckedHouses));
    let counter = 0;
    let binaryString = ""
    allCheckedPositions.forEach((element) => {
      while (counter < element) {
        binaryString += "0";
        counter++;
      }
      binaryString += "1";
      counter++;
    });
    let intPath = wasmModule.exports.checkRatRiddleAnswer(BigInt(`0b${ [...binaryString.padEnd(64, "0")].reverse().join('')}`));
    let path = []
    if (intPath != -1) {
      for (let i = 0; i <= curDay; i++) {
        path.push(intPath & 0x07);
        intPath >>= 3;
      }
      path.reverse();
    }
    setAllCheckedHouses(allCheckedHouses.concat(curCheckedHouses));
    setCurCheckedHouses(new Set());
    setTotalDays(curDay + 1);
    setCurDay(0);
    setSubmittedTraps(true);
    setPath(path);
  }

  const resetPuzzle = useCallback(() => {
      setAllCheckedHouses([]);
      setCurCheckedHouses(new Set());
      setCurDay(0);
      setSubmittedTraps(false);
      setPath([]);
      setPrevDay(null);
      setConfetti(false)}, []
  );

  const handleSliderChange = (_, value) => {
    setPrevDay(curDay);
    setCurDay(value - 1);
  }

  const convertToAbsPos = (checkedPositions) => {
    return checkedPositions.flatMap((set, idx) => {
      return [...set].map(elem => elem + idx * NUM_HOUSES);
    });
  }

  return (
    <RootBackground>
      <TopBar text="Envelope #1: The Sneaky Rat" isPuzzlePage={true} resetFunc={resetPuzzle}/>
      {confetti && <Confetti width={width} height={height} />}
      <RatRiddleDescription theme={theme} />
      <Fade in={true} mountOnEnter unmountOnExit
          timeout={theme.transitions.duration.longTextFade}
          style={{ transitionDelay: theme.delays.duration.longDelay }}
      >
        <Box sx={{ position: "relative", width: "75vw", height: "50vh" }}>
          <RowOfHouses
              NUM_HOUSES={NUM_HOUSES}
              submittedTraps={submittedTraps}
              trapHouse={trapHouse}
              curCheckedHouses={curCheckedHouses}
              allCheckedHouses={allCheckedHouses}
              path={path}
              curDay={curDay}
              prevDay={prevDay}
          />
          {!submittedTraps && (
            <Fade in={true} mountOnEnter unmountOnExit
                timeout={theme.transitions.duration.standardTextFade}
            >
              <Stack
                  direction="row"
                  justifyContent="center"
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={2}
              >
                <Button variant="contained" disabled={curCheckedHouses.size !== 2 || curDay > 5} 
                    onClick={nextDay}>&nbsp;&nbsp;Next Day&nbsp;&nbsp;</Button>
                <Button variant="contained" disabled={curCheckedHouses.size !== 2} 
                    onClick={submitRiddleAnswer}>Submit Answer</Button>
              </Stack>
            </Fade>
          )}
          {submittedTraps && solved && (
            <Box>
              <SolvedStack
                checkBonusAnswer={wasmModule.exports.checkRatBonusAnswer}
                setConfetti={setConfetti}
                totalDays={totalDays}
              />
            </Box>
          )}
          {submittedTraps && !solved && (
            <Box>
              <UnsolvedStack
                curDay={curDay}
                totalDays={totalDays}
                path={path}
                allCheckedHouses={allCheckedHouses}
                handleSliderChange={handleSliderChange}
              />
            </Box>
          )}
        </Box>
      </Fade>
    </RootBackground>
  )
}

export default RatRiddlePage