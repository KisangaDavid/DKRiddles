import { useState, useEffect } from 'react'
import { useWindowSize } from 'react-use'
import { useTheme } from '@mui/material/styles';
import init from '/src/wasm/ratRiddle.wasm?init'

import RowOfHouses from './RowOfHouses.jsx';
import SolvedStack from './SolvedStack.jsx';
import UnsolvedStack from './UnsolvedStack.jsx';
import Confetti from 'react-confetti'
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Zoom from '@mui/material/Zoom';
import Fade from '@mui/material/Fade';
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
      overflow: "auto",
      backgroundImage:'radial-gradient(ellipse 80% 50% at 50% -15%, hsl(210, 100%, 16%), hsla(208, 100.00%, 3.70%, 0.64))',
    }}>
    <TopBar text="Envelope #1: The Sneaky Rat" isHomePage={false} />
    {confetti && <Confetti width={width} height={height}/>}
    <Box sx={{width: "80vw", position: "relative", mb:"1vh"}}>
      <Fade in={true} mountOnEnter unmountOnExit timeout={theme.transitions.duration.standardTextFade}>
      <p> 
        You open the first envelope. Inside you find a notecard, along with two rat traps. The notecard reads: <br />
        <i>You will find that the neighborhood adjacent to yours is suffering from a mysterious rat infestation. 
        Solve their rodent problem using only the two provided rat traps and your own logical ability.</i> 
      </p>
      </Fade>
      <Fade in={true} mountOnEnter unmountOnExit 
        timeout={theme.transitions.duration.standardTextFade}>
      <p>After arriving at the rat infested neighborhood 
        and doing some preliminary investigation, you discover that the neighborhood is actually being plagued by just a single rat, 
        which sneaks over to an adjacent house every night. You know that if you trap houses 1 and 2 on the first day, 2 and 3 on the second day,
        3 and 4 on the third day, and so on, you can guarantee that you'll catch the rat in 7 days. However, Mr. Riddle Man will not accept anything but perfection - 
        what strategy can you employ that is guaranteed to catch the rat in the least amount of days?
      </p>
      </Fade>
      
    </Box>
      <Fade in={true} mountOnEnter unmountOnExit 
        timeout={theme.transitions.duration.standardTextFade}>
    <Box sx={{position: "relative", width: "75vw", height: "50vh"}}>
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
        <Fade in={true} mountOnEnter unmountOnExit 
        timeout={theme.transitions.duration.standardTextFade}>
          <Stack 
            direction="row"
            justifyContent="center" 
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <Button variant="contained" disabled = {curCheckedHouses.size !== 2 || curDay > 5} onClick={nextDay}>&nbsp;&nbsp;Next Day&nbsp;&nbsp;</Button>
            <Button variant="contained" disabled = {curCheckedHouses.size !== 2} onClick={submitRiddleAnswer}>Submit Answer</Button>
          </Stack>
        </Fade>
      }
      {submittedTraps && solved &&
         <Box >
          <SolvedStack 
            checkBonusAnswer={wasmModule != null ? wasmModule.exports.checkBonusAnswer : () =>{}}
            setConfetti={setConfetti}      
            totalDays={totalDays} 
          />
         </Box>
      }
      {submittedTraps && !solved &&
          <Box>
            <UnsolvedStack 
              curDay={curDay} 
              totalDays={totalDays} 
              path={path} 
              allCheckedHouses={allCheckedHouses} 
              handleSliderChange={handleSliderChange} 
            />
          </Box>
      }
      <Button 
        sx={{position: "relative", float: "left", top: submittedTraps && solved ? "-4vh" : 0}}
        variant="text" color="secondary"
        startIcon={<RefreshIcon />}
        onClick={resetPuzzle}
      >
        Reset Puzzle
      </Button>
    </Box>
    </Fade>
    </Box>
    
  )
}

export default RatRiddlePage
