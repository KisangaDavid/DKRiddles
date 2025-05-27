import { useState, useEffect } from 'react'
import { useWindowSize } from 'react-use'
import { useTheme } from '@mui/material/styles';
import init from '/src/wasm/ratRiddle.wasm?init'

import RowOfHouses from './RowOfHouses.jsx';
import SolvedStack from './SolvedStack.jsx';
import UnsolvedStack from './UnsolvedStack.jsx';
import Confetti from 'react-confetti'
import BonusChallenge from './BonusChallenge.jsx'
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Zoom from '@mui/material/Zoom';
import RefreshIcon from '@mui/icons-material/Refresh';
import Box from "@mui/material/Box";
import TopBar from '../common/TopBar.jsx';

const NUM_HOUSES = 8;

function RatRiddlePage() {

  const [submittedTraps, setSubmittedTraps] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [path, setPath] = useState([]);
  const [curDay, setCurDay] = useState(0);
  const [prevDay, setPrevDay] = useState(-1);
  const [totalDays, setTotalDays] = useState(0);
  const [wasmModule, setWasmModule] = useState(null);
  const [allCheckedHouses, setAllCheckedHouses] = useState([]);
  const [curCheckedHouses, setCurCheckedHouses] = useState(new Set());
  const [bonusChallenge, setBonusChallenge] = useState(false);

  const {width, height} = useWindowSize();
  const theme = useTheme();

  const solved = path.length == 0;

  // unused, but required by wasm binary
  const imports = {
    "wasi_snapshot_preview1": {
      "proc_exit": () => {},
      "fd_close": () => {},
      "fd_write": () => {},
      "fd_seek": () => {}
    }
  }

  useEffect(() => {
    init(imports).then((instance) => {
      setWasmModule(instance);
  })}, []);

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
    console.log(newSet);
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
    allCheckedPositions.forEach(element => {
      while (counter < element) {
        binaryString += "0";
        counter++;
      }
      binaryString += "1";
      counter++;
    });
    let intPath = wasmModule.exports.checkRiddleAnswer(BigInt(`0b${ [...binaryString.padEnd(64, "0")].reverse().join('')}`));
    let path = []
    if(intPath != -1) {
      for(let i = 0; i <= curDay; i++) {
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

  const resetPuzzle = () => {
    setAllCheckedHouses([]);
    setCurCheckedHouses(new Set());
    setCurDay(0);
    setSubmittedTraps(false);
    setPath([]);
    setPrevDay(-1);
    setConfetti(false);
    setBonusChallenge(false);
  }

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
    <Box sx={{
      display:"flex",
      flexDirection: 'column',
      alignItems: "center",
      height: "100vh",
      width: "100vw",
      overflow: "hidden"
    }}>
    <TopBar text="The Hiding Rat" isHomePage={false} sx={{width: "100%"}}/>
    {confetti && <Confetti width={width} height={height}/>}
    <Box sx={{width: "80vw", position: "relative", mb:"2vh"}}>
      <p> 
        Ever on the lookout for side hustles, our friend Mr. Riddle Man has accepted a request to get rid of a neighborhood's rat problem (for a lucrative fee, of course.) 
        After some investigation, he discovers that the neighborhood is actually being plagued by just a single rat, which scurries to an adjacent house every night.
        Unfortunately, Mr. Riddle Man does not know the current position of the rat, and can only afford to buy two reusable rat traps. Even so, he knows that if he traps houses 
        1 and 2 on the first day, 2 and 3 on the second day, 3 and 4 on the third day, and so on, he is guaranteed to catch the rat in 7 days. Can you save our friend some time, 
        and propose a plan that is guaranteed to catch the rat in less than 7 days? 
      </p>
    </Box>
    <Box sx={{position: "relative", width: "80vw", height: "50vh"}}>
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
      {!submittedTraps && 
        <Zoom 
          mountOnEnter 
          unmountOnExit 
          in={true}
          timeout = {theme.transitions.duration.enteringScreen}
        >
          <Stack 
            direction="row"
            justifyContent="center" 
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <Button variant="contained" disabled = {curCheckedHouses.size !== 2 || curDay > 5} onClick={nextDay}>&nbsp;&nbsp;Next Day&nbsp;&nbsp;</Button>
            <Button variant="contained" disabled = {curCheckedHouses.size !== 2} onClick={submitRiddleAnswer}>Submit Answer</Button>
          </Stack>
        </Zoom>
      }
      {submittedTraps && solved && bonusChallenge &&
        <Zoom 
          mountOnEnter 
          unmountOnExit 
          in={true}
          timeout={theme.transitions.duration.standard}
        >
          <Box>
            <BonusChallenge 
              numBonusHouses={Math.floor(Math.random() * (10) + 20)}
              checkBonusAnswer={wasmModule != null ? wasmModule.exports.checkBonusAnswer : () =>{}}
              setConfetti={setConfetti}
            />
          </Box>
        </Zoom>
      }
      {submittedTraps && solved && !bonusChallenge &&
        <Zoom 
          mountOnEnter 
          unmountOnExit 
          in={true}
          timeout={theme.transitions.duration.standard}
        >
         <Box>
          <SolvedStack 
            totalDays={totalDays} 
            setBonusChallenge={setBonusChallenge}
          />
         </Box>
       </Zoom>
      }
      {submittedTraps && !solved &&
        <Zoom 
          in={true} 
          mountOnEnter 
          unmountOnExit 
          timeout={theme.transitions.duration.standard}
        > 
          <Box>
            <UnsolvedStack 
              curDay={curDay} 
              totalDays={totalDays} 
              path={path} 
              allCheckedHouses={allCheckedHouses} 
              handleSliderChange={handleSliderChange} 
            />
          </Box>
      </Zoom>
}
      <Button 
        sx={{position: "absolute", left: 0}}
        variant="text" color="secondary"
        startIcon={<RefreshIcon />}
        onClick={resetPuzzle}
      >
        Reset Puzzle
      </Button>
    </Box>
    </Box>
  )
}

export default RatRiddlePage
