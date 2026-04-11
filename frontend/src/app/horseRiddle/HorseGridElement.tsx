import Image from 'next/image.js';
import Grid from '@mui/material/Grid';
import Zoom from "@mui/material/Zoom";
import horseImg from "../../assets/horseClipArt.png";

interface props {
  horseNumber: number;
  onClick: (index: number) => void;
  selected: boolean;
}
function HorseGridElement({horseNumber, onClick, selected} : props) {
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
        onClick={() => onClick(horseNumber)}
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