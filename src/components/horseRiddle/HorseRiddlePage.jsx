import { useState, useEffect } from 'react'
import { useWindowSize } from 'react-use'
import { useTheme } from '@mui/material/styles';
import init from '/src/wasm/horseRiddle.wasm?init'

import Grid from '@mui/material/Grid';
import Confetti from 'react-confetti'
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import horseImg from "/src/assets/horseClipArt.jpg";
import Fade from '@mui/material/Fade';
import RefreshIcon from '@mui/icons-material/Refresh';
import Box from "@mui/material/Box";
import TopBar from '../common/TopBar.jsx';
import HorseGridElement from './HorseGridElement.jsx';

const NUM_HORSES = 25;
const RACE_LENGTH = 5;

function HorseRiddlePage() {

  const [wasmModule, setWasmModule] = useState(null);
  const [currentRace, setCurrentRace] = useState([]);
  const [allRaces, setAllRaces] = useState([]);
  const {width, height} = useWindowSize();
  const theme = useTheme();

  // unused, but required by wasm binary
  const imports = {
    "wasi_snapshot_preview1": {
      "proc_exit": () => {},
      "fd_close": () => {},
      "fd_write": () => {},
      "fd_seek": () => {}
    }
  } // TODO: consolidate all the wasm stuff

  useEffect(() => {
    init(imports).then((instance) => {
      setWasmModule(instance);
  })}, []);

  // const submitAllRacesAndCheck = () => {
  //   // submitRace([0,1,2,3,4]);
  //   // submitRace([5,6,7,8,9]);
  //   // submitRace([10,11,12,13,14]);
  //   // submitRace([15,16,17,18,19]);
  //   // submitRace([20,21,22,23,24]);
  //   // submitRace([0,6,12,17,22]);
  //   // submitRace([17,6,15,24,20]);
  //   let horsesToSubmit = [20, 24, 22]; 
  //   let horsesToSubmitInt = 0;
  //   for (const horse of horsesToSubmit) {
  //     horsesToSubmitInt <<= 5;
  //     horsesToSubmitInt |= horse;
  //   }
  // }

  const addRemoveHorseToRace = (horseIdx) => {
    if (currentRace.includes(horseIdx)) {
      removeHorseFromRace(horseIdx);
    }
    else if (!currentRace.includes(horseIdx) && currentRace.length < RACE_LENGTH) {
      setCurrentRace(currentRace => [...currentRace, horseIdx]);
    }
    console.log("current race is: " + currentRace);
  }

  const removeHorseFromRace = (horseIdx) => {
    setCurrentRace(currentRace => currentRace.filter(idx => idx != horseIdx));
  }

  const submitRace = (horses) => {
    console.log(horses) // use currentRace mayhaps
    let intRepHorsesToRace = 0;
    for (const horse of horses) {
      intRepHorsesToRace <<= 5;
      intRepHorsesToRace = intRepHorsesToRace | horse;
    }
    console.log("int rep of horses to race: " + intRepHorsesToRace);
    let intRes = wasmModule.exports.submitRace(intRepHorsesToRace);
    console.log("intRes of horses to race: " + intRes)
  }

  const checkAnswer = (horsesToSubmit) => {
    let horsesToSubmitInt = 0;
    for (const horse of horsesToSubmit) {
      horsesToSubmitInt <<= 5;
      horsesToSubmitInt |= horse;
    }
    console.log("horses to submit int: " + horsesToSubmitInt);
    let ans = wasmModule.exports.checkAnswer(horsesToSubmitInt)
    console.log("answer from wasm: " + ans);
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
    <TopBar text="Envelope #2: Horse" isHomePage={false} />
    <Box sx={{display: "flex", flexDirection: 'column', alignItems: "center", width: "80vw", position: "relative", mb:"1vh"}}>
          <p>
        Filler text this is just filler text with a bunch of random words cuz I want to see how this filler text will 
        look like at the top of the page. Nothing here but boring filler text. Bananas are actually a berry! 
        The banana tree is not actually a tree, it is considered the world's largest shrub!  That should be enough filler text, if we double it!
        Filler text this is just filler text with a bunch of random words cuz I want to see how this filler text will 
        look like at the top of the page. Nothing here but boring filler text. Bananas are actually a berry! 
        The banana tree is not actually a tree, it is considered the world's largest shrub!  That should be enough filler text, if we double it!
      </p>
    </Box>

      <Box sx={{display: "flex", flexDirection: "column", width: "75vw", position: "relative", mb:"1vh"}}>
        <Grid 
          container 
          spacing={1} 
          columns={5} 
          direction = "row" 
          sx={{
            display: "flex",
            width: "75%"
          }}
        >
      {currentRace.map((horseIdx, idx) => (
        <HorseGridElement key={idx} horseNumber={horseIdx + 1} onClick={() => removeHorseFromRace(horseIdx)}/>))}
      </Grid> 
        </Box>
      <Box sx={{display: "flex", flexDirection: "row", width: "75vw", position: "relative", mb:"1vh"}}>
      <Grid 
          container 
          spacing={1} 
          columns={5} 
          direction = "row" 
          sx={{
            display: "flex",
            width: "40%"
          }}
        >
      {[...Array(NUM_HORSES)].map((_, idx) => (
        <HorseGridElement key={idx} horseNumber={idx + 1} onClick={() => addRemoveHorseToRace(idx)}/>))}
        </Grid>
      </Box>
      <Button onClick={() => submitRace()}>Button!</Button>
    </Box> 
  )
}

export default HorseRiddlePage
