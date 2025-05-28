import Stack from "@mui/material/Stack";
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

function UnsolvedStack({curDay, totalDays, path, allCheckedHouses, handleSliderChange}) {
  const theme = useTheme();
  return (
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
        <p> The rat can easily escape this arrangement of traps, use the slider above to see how! </p>
        <p>
          On day {curDay + 1}, the rat {curDay == 0 ? "starts in" : "scurries over to"} house {path[curDay] + 1}. 
          You trap houses{" "} {allCheckedHouses.length != 0 ? Math.min(...allCheckedHouses[curDay]) + 1 : 0} {" "}
          and {allCheckedHouses.length != 0 ? Math.max(...allCheckedHouses[curDay]) + 1 : 0}.
        </p>
      </Stack>
   </Box>
  );
}



export default UnsolvedStack;
