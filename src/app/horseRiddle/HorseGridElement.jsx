import Image from 'next/image.js';
import Grid from '@mui/material/Grid';
import Zoom from "@mui/material/Zoom";
import horseImg from "../../assets/horseClipArt.png";


function HorseGridElement({horseNumber, onClick, selected}) {
  return (
  <Zoom in={true} mountOnEnter unmountOnExit>
    <Grid size={1}
      display="flex" 
      flexDirection="column"
      justifyContent="center" 
      alignItems="center"
      style={{overflow: "clip"}}
     
    >  
      <Image
        src={horseImg}
        alt="horse"
        onClick={onClick}
        style={{
          objectFit: "contain", 
          height: "95%",
          width: "95%",  
          cursor: 'pointer',
          filter: selected ? 'drop-shadow(0px 0px 2px white)' : ''}}
      />
      {horseNumber}
    </Grid>
  </Zoom>
  )
}

export default HorseGridElement