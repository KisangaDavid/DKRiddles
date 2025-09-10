import Grid from '@mui/material/Grid';
import Zoom from "@mui/material/Zoom";

import horseImg from "/src/assets/horseClipArt.png";

function HorseGridElement({horseNumber, onClick}) {
  return (
  <Zoom in={true} mountOnEnter unmountOnExit>
    <Grid size={1}
      display="flex" 
      flexDirection="column"
      justifyContent="center" 
      alignItems="center"
      style={{overflow: "clip", height:"10vh"}}
    >  
      <img
        src={horseImg}
        style={{objectFit: "contain", height: "85%", width: "100%"}}
        onClick={onClick}
      />
      {horseNumber}
    </Grid>
  </Zoom>
  )
}

export default HorseGridElement