import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import kernelImg from "/src/assets/kernel.png";
import Fade from '@mui/material/Fade';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";


const NUM_COLUMNS_OF_KERNELS = 3;
const MAX_NUM_KERNELS = 12;

function PileStack({numInPile, pileNum}) {
  return (
  <Stack
    direction="column"
    spacing={2}
  >
    <p>There are {numInPile} kernel{numInPile == 1 ? "" : "s"} in pile {pileNum}</p>
    <Grid
      container
      spacing={1}
      columns={NUM_COLUMNS_OF_KERNELS}
      direction="row"
    >
      {[...Array(numInPile)].map(() => (
        <Grid size={1}
          flexDirection="column"
          justifyContent="center" 
          alignItems="center"
          style={{display: "flex", overflow: "clip"}}
        >  
          <img
            src={kernelImg}
            style={{
              objectFit: "contain", 
              height: "85%", 
              width: "85%",
              filter: 'drop-shadow(0px 0px 5px white)' // TODO: apply drop shadow only if kernel is selected
            }}
          /> 
        </Grid>
      ))}
      </Grid>
  </Stack>
  )
}

export default PileStack;