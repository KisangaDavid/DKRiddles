import Stack from "@mui/material/Stack";
import Slider from '@mui/material/Slider';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import { standardTextFade } from "../_common/utils";

interface props {
  curDay: number;
  totalDays: number;
  path: Array<number>;
  allCheckedHouses: Array<Set<number>>;
  handleSliderChange: (event: Event, value: number) => void;
}
function UnsolvedStack({curDay, totalDays, path, allCheckedHouses, handleSliderChange} : props) {
  return (
    <Fade 
      in={true} 
      mountOnEnter 
      unmountOnExit 
      timeout={standardTextFade}
    >
      <Box>
        <Stack justifyContent="center" alignItems="center" >
          <Slider 
            sx={{ width: '40%'}} 
            defaultValue={1}  
            valueLabelFormat={(value) => "Day " + value} 
            valueLabelDisplay="auto" 
            marks={true}
            shiftStep={1} 
            step={1} 
            min={1} 
            max={totalDays} 
            onChange={handleSliderChange}
          />
          <p>
            You set the traps ... but fail to catch the rat. After some thinking, you
            realize that the rat could easily escape this arrangement of traps with the
            following strategy: <br /> <br />
            On day {curDay + 1}, you trap houses{" "}
            {allCheckedHouses.length != 0 ? Math.min(...allCheckedHouses[curDay]) + 1 : 0}{" "}
            and{" "}{allCheckedHouses.length != 0 ? Math.max(...allCheckedHouses[curDay]) + 1 : 0}. 
            The rat {curDay == 0 ? "starts in house " : "has scurried over to house "}
            {path[curDay] + 1}{curDay != 0 && " during the night"}.
          </p>
          </Stack>
      </Box>
    </Fade>
  );
}

export default UnsolvedStack;