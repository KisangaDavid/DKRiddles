import { useMemo } from 'react';
import Stack from "@mui/material/Stack";
import { useTheme } from '@mui/material/styles';
import kernelImg from "/src/assets/kernel.png";
import Zoom from '@mui/material/Zoom';
import Grid from "@mui/material/Grid";


const NUM_COLUMNS_OF_KERNELS = 3;
const MAX_NUM_KERNELS = 12;

function PileStack({pileKernels, pileNum, selectedKernels, canBeSelectedFrom, handleKernelClick}) {
  
  const theme = useTheme();

  const randomRotations = useMemo(() => 
    [...Array(MAX_NUM_KERNELS)].map(() => Math.random() * 360)
  , []);
  return (
    <Stack
      direction="column"
      spacing={1}
    >
      <p>There {pileKernels.length == 1 ? "is" : "are"} {pileKernels.length} kernel{pileKernels.length == 1 ? "" : "s"} in pile {pileNum + 1}</p>
      <Grid
        container
        rowSpacing={1} columnSpacing={0}
        columns={NUM_COLUMNS_OF_KERNELS}
        direction="row"
      >
        {[...Array(MAX_NUM_KERNELS)].map((_, idx) => (
          
          <Zoom in={pileKernels.includes(idx)} timeout={theme.transitions.duration.shortImageZoom}>
            <Grid key={idx} size={1}
              flexDirection="column"
              justifyContent="center" 
              alignItems="center"
              style={{display: "flex", overflow: "clip", height: "6vh"}}
            >  
              <img
                src={kernelImg}
                onClick= {() => handleKernelClick(idx, pileNum)}
                style={{
                  objectFit: "contain", 
                  height: "85%", 
                  width: "85%",
                  transform: `rotate(${randomRotations[idx]}deg)`,
                  filter: (canBeSelectedFrom && selectedKernels.has(idx)) ? 'drop-shadow(0px 0px 5px white)' : ''
                }} />
            </Grid>
          </Zoom>
        ))}
      </Grid>
    </Stack>
  )
}

export default PileStack;