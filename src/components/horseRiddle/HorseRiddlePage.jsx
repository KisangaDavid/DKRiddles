import { useState, useEffect } from 'react'
import { useWindowSize } from 'react-use'
import { useTheme } from '@mui/material/styles';
import init from '/src/wasm/horseRiddle.wasm?init'

import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import horseImg from "/src/assets/horseClipArt.jpg";
import Fade from '@mui/material/Fade';
import RefreshIcon from '@mui/icons-material/Refresh';
import Box from "@mui/material/Box";
import TopBar from '../common/TopBar.jsx';
import HorseGridElement from './HorseGridElement.jsx';
import HorseRaceResults from './HorseRaceResults.jsx';

const NUM_HORSES = 25;
const RACE_LENGTH = 5;
const MAX_NUM_RACES = 15;

const INVALID_HORSE_MSG = "Enter an integer between 1 and 25 for each position!"
const NO_DUP_HORSES_MSG = "You cannot enter the same horse in two different positions!"

function HorseRiddlePage() {

  const [wasmModule, setWasmModule] = useState(null);
  const [currentRace, setCurrentRace] = useState([]);
  const [finishedRaces, setFinishedRaces] = useState([]);
  // const [errorMessage, setErrorMessage] = useState("");
  const [fastestHorse, setFastestHorse] = useState(-1)
  const [secondFastestHorse, setSecondFastestHorse] = useState(-1)
  const [thirdFastestHorse, setThirdFastestHorse] = useState(-1)
  const theme = useTheme();

  // let prevRacesFlattened = finishedRaces.flat();
  // unused, but required by wasm binary
  const imports = {
    "wasi_snapshot_preview1": {
      "proc_exit": () => {},
      "fd_close": () => {},
      "fd_write": () => {},
      "fd_seek": () => {}
    }
  } // TODO: consolidate all the wasm stuff
  let trifectaBetFilled = fastestHorse != -1 && secondFastestHorse != -1 && thirdFastestHorse != -1;

    const validateTriectaBet = () => {
      console.log("validating trifecta bet!")
    if (trifectaBetFilled) {
      if (fastestHorse > 25 || secondFastestHorse > 25 || thirdFastestHorse > 25) {
        return INVALID_HORSE_MSG;
      }
      if (fastestHorse == secondFastestHorse || fastestHorse == thirdFastestHorse || secondFastestHorse == thirdFastestHorse) {
        return NO_DUP_HORSES_MSG;
      }
    }
    return "";
  }

  let trifectaStatusMessage = validateTriectaBet();


  console.log("SUM SUM");

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
  console.log("finished races: " + finishedRaces.length);
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

  const handleTrifectaChange = (e, settingFunc) => {
    const intsOnly = e.target.value.replace(/[^0-9]/g, '');
    e.target.value = intsOnly;
    intsOnly.length < 1 ? settingFunc(-1) : settingFunc(intsOnly)
}

  const submitRace = () => {
    console.log(currentRace) // use currentRace mayhaps
    let intRepHorsesToRace = 0;
    for (const horse of currentRace) {
      intRepHorsesToRace <<= 5;
      intRepHorsesToRace = intRepHorsesToRace | horse;
    }
    
    setCurrentRace([]);
    console.log("finished races: " + finishedRaces);
    console.log("int rep of horses to race: " + intRepHorsesToRace);
    let intRes = wasmModule.exports.submitRace(intRepHorsesToRace);
    console.log("intRes of horses to race: " + intRes)
    let horseOrder = [];
    for(let i = 0; i < RACE_LENGTH; i++) {
      horseOrder.push(intRes & 0x1f)
      intRes >>= 5;
    } // 35970 is what we want
    console.log("horse order: " + horseOrder);
    setFinishedRaces([...finishedRaces, ...horseOrder.reverse()]);
    
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
    <TopBar text="Envelope #2: Hasty Horses" isHomePage={false} />
    <Box sx={{display: "flex", flexDirection: 'column', alignItems: "center", width: "80vw", position: "relative", mb:"2vh"}}>
          <p>
        You tear open the second envelop and find a small purple flask alongside a note. The note reads:<br />
        <i>A Riddle Man must be bold and resourceful. 
          Prove you are both by attaining $1 million dollars by sundown tomorrow. 
          You may use the included potion of somnolence to aide you in this task.</i> <br /> <br />
        After quickly Googling somnolence, you come up with a brilliant plan: first, you'll sneak into the local racetrack with the help of the Riddeman's sleeping potion.
         Once inside, you'll race each horse and time them to determine the fastest three. The next day you'll place a winning trifecta bet (fastest 3 horses), which if you put your entire life savings into should result in a $1 million dollar payout!
         <br /> <br />
         You successfully sneak into the racetrack and are about to start timing horses when you discover you've forgotten your stopwatch at home! 
         After some thinking, you realize you can still determine the fastest three horses by racing five horses at a time and marking down the order in which they finish.
         However, each additional race you set up increases the risk that the sleeping security guards will wake up. 
         How can you determine the fastest three horses in the least amount of races?
      </p>
    </Box>
      <Box sx={{display: "flex", justifyContent: "space-between", flexDirection: "row", width: "75vw", position: "relative", mb:"1vh"}}>
      <Box sx={{display: "flex", flexDirection: "column", width: "25vw", position: "relative", mb:"1vh"}}>
        Select 5 horses to race!
      <Grid 
          container 
          spacing={1} 
          columns={5} 
          direction = "row" 
          sx={{
            mt: "1vh",
            display: "flex",
            width: "100%"
          }}
        >
      {[...Array(NUM_HORSES)].map((_, idx) => (
        <HorseGridElement key={idx} horseNumber={idx + 1} onClick={() => addRemoveHorseToRace(idx)}/>))}
        </Grid>
        </Box> 
        <Box sx={{display: "flex", alignItems: "center", flexDirection: "column", width: "25vw", position: "relative", mb:"2vh", minHeight:"15vh"}}>
          <Box sx={{display: "flex", alignItems: "center", flexDirection: "column", width: "25vw", minHeight: "15vh"}}>
       
        Current Race:
        <Grid 
          container 
          spacing={1} 
          columns={5} 
          direction = "row" 
          sx={{
            display: "flex",
            width: "80%",
            mt: "1vh"
          }}
        >     
      {currentRace.map((horseIdx, idx) => (
        <HorseGridElement key={idx} horseNumber={horseIdx + 1} onClick={() => removeHorseFromRace(horseIdx)}/>))}
      </Grid> 
      </Box>
        <Button variant="contained" onClick={() => submitRace()} disabled={currentRace.length != 5}>Race Horses!</Button>

        <Box sx={{display: "flex", flexDirection: "column", width: "22vw", justifyContent: "center", alignItems: "center", position: "absolute", bottom: "10%"}}>
                              <Box sx={{display: "flex", width: "100%", justifyContent: "center", position: "relative", mb:"2vh"}}>
          <p>{trifectaStatusMessage}</p>
          </Box>
                    <Stack 
            direction="row"
            justifyContent="center" 
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
            sx={{mb: "2vh"}}
          >

                      <TextField
                        id="fastestHorse"
                        variant="standard" 
                        label="Fastest Horse"
                        onChange={(e) => handleTrifectaChange(e, setFastestHorse)}
                      />
                    <TextField
                      id="secondFastestHorse"
                      variant="standard" 
                      label="2nd Fastest Horse"
                      onChange={(e) => handleTrifectaChange(e, setSecondFastestHorse)}
                    />
                    <TextField
                      id="thirdFastestHorse"
                      variant="standard" 
                      label="3rd Fastest Horse"
                      onChange={(e) => handleTrifectaChange(e, setThirdFastestHorse)}
                    />
                    </Stack>
                    

    <Button onClick={() => submitRace()}>Place Trifecta Bet</Button>
                    </Box>
        </Box>
      {/* </Box> */}
      <Box sx={{display: "flex", flexDirection: "column", width: "25vw", position: "relative", mb:"1vh"}}>
        <Box sx={{mb:"1vh"}}>
        Previous Races:  
        </Box>
      <Grid
        container 
          spacing={0} 
          columns={6} 
          direction = "row"
        sx={{
          display: "flex",
          borderTop: '2px solid',
          borderLeft: '2px solid',
          borderColor: 'divider',
          '& > div': {
            borderRight: '2px solid',
            borderBottom: '2px solid',
            borderColor: 'divider',
          },
        }}
      >
        <Grid size={1} style={{overflow: "clip"}}></Grid>
        <Grid size={1} style={{overflow: "clip"}}>1st</Grid>
        <Grid size={1} style={{overflow: "clip"}}>2nd</Grid>
        <Grid size={1} style={{overflow: "clip"}}>3rd</Grid>
        <Grid size={1} style={{overflow: "clip"}}>4th</Grid>
        <Grid size={1} style={{overflow: "clip"}}>5th</Grid>
      {[...Array(MAX_NUM_RACES * 6)].map((_, idx) => (
        <Grid size={1} key={idx} style={{overflow: "clip"}}>{ idx % 6 == 0 ? "Race #" + (1+idx/6)  : (finishedRaces.length > idx  - 1 - Math.floor(idx / 6) ? finishedRaces[idx - 1 - Math.floor(idx / 6)] + 1 : "")}</Grid>))}
      </Grid>
      </Box>
      </Box>
      </Box>
  )
      }
    
export default HorseRiddlePage