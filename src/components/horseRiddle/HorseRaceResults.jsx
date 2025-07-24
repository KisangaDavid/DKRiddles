

import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import Confetti from 'react-confetti'
import HorseGridElement from './HorseGridElement.jsx';

function HorseRaceResults({prevRaces}) {
    let flattened = prevRaces.flat();
    return  <Grid 
          container 
          spacing={1} 
          columns={5} 
          direction = "row" 
          sx={{
            display: "flex",
            width: "40%"
          }}
        >
            {flattened.map((horseIdx, raceNum) => (
               
                  <HorseGridElement key={horseIdx} horseNumber={horseIdx}/>
          ))}

      {/* {currentRace.map((horseIdx, idx) => (
        <HorseGridElement key={idx} horseNumber={horseIdx + 1} onClick={() => removeHorseFromRace(horseIdx)}/>))} */}
      </Grid> 
    
    
                // {prevRaces.map((horsesInRace, raceNum) => (
                // horsesInRace.map((horseIdx, idx) => (
                //     <HorseGridElement key={idx} horseNumber={horseIdx} onClick={() => removeHorseFromRace(horseIdx)}/>))))}
    
    
    
    
    
    // <Grid size={1}
    //       display="flex" 
    //       flexDirection="column"
    //       justifyContent="center" 
    //       alignItems="center"
    //     >  
    //       <img
    //         src={horseImg}
    //         style={{objectFit: "contain", height: "100%", width: "100%"}}
    //         onClick={onClick}
    //       />
    //       {horseNumber}
    //       </Grid>
}

export default HorseRaceResults