import { useState, useEffect } from 'react'
import { useWindowSize } from 'react-use'
import { useTheme } from '@mui/material/styles';
import init from '/src/wasm/horseRiddle.wasm?init'


import Confetti from 'react-confetti'
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import RefreshIcon from '@mui/icons-material/Refresh';
import Box from "@mui/material/Box";
import TopBar from '../common/TopBar.jsx';

function HorseRiddlePage() {

  const [wasmModule, setWasmModule] = useState(null);
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
  }

  useEffect(() => {
    init(imports).then((instance) => {
      setWasmModule(instance);
  })}, []);


  const submitRace = (horses) => {
    console.log(horses)
    let intRepHorsesToRace = 0;
    for (const horse of horses) {
        horsesToRace <<= 5;
        horsesToRace = horsesToRace | horse;
        
    }
    console.log("horses to race: " + horsesToRace);
    wasmModule.exports.submitRace(intRepHorsesToRace)
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
    <Box sx={{width: "80vw", position: "relative", mb:"1vh"}}>
      {/* <Fade in={true} mountOnEnter unmountOnExit timeout={theme.transitions.duration.longTextFade}>
      <p> 
        You open the second envelope. PLACEHOLDER </p>      </Fade> */}
      {/* <Fade in={true} mountOnEnter unmountOnExit 
        timeout={theme.transitions.duration.longTextFade} style={{
                    transitionDelay: 350
                  }}> */}
      <p>After arriving at the rat infested neighborhood 
        and doing some preliminary investigation, you discover that the neighborhood is actually being plagued by just a single rat, 
        which sneaks over to an adjacent house every night. You know that if you trap houses 1 and 2 on the first day, 2 and 3 on the second day,
        3 and 4 on the third day, and so on, you can guarantee that you'll catch the rat in 7 days. However, Mr. Riddle Man will not accept anything but perfection - 
        what strategy can you employ that is guaranteed to catch the rat in the least amount of days?
      </p>
      <Button onClick={() => submitRace([2,3,4,15,23])}>Button!</Button>
      {/* </Fade> */}
      
    </Box>
   </Box>    
  )
}

export default HorseRiddlePage
