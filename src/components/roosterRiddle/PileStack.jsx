import Stack from "@mui/material/Stack";
import { useState, useEffect, useCallback } from 'react';
import Divider from "@mui/material/Divider";
import kernelImg from "/src/assets/kernel.png";
import Fade from '@mui/material/Fade';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";


const NUM_COLUMNS_OF_KERNELS = 3;
const MAX_NUM_KERNELS = 12;

function PileStack({numInPile, pileNum, selectedKernels, setSelectedKernels}) {
  

  return (
  <Stack
    direction="column"
    spacing={1}
  >
    <p>There are {numInPile} kernel{numInPile == 1 ? "" : "s"} in pile {pileNum}</p>
    <Grid
      container
      rowSpacing={1} columnSpacing={0}
      columns={NUM_COLUMNS_OF_KERNELS}
      direction="row"
    >
      {[...Array(numInPile)].map((idx1, idx2) => (
        <Grid size={1}
          flexDirection="column"
          justifyContent="center" 
          alignItems="center"
          style={{display: "flex", overflow: "clip", height: "6vh"}}
        >  
          <img
            src={kernelImg}
            onClick= {() => handleKernelClick(idx2)}
            style={{
              objectFit: "contain", 
              height: "85%", 
              width: "85%",
              filter: selectedKernels.has(idx2) ? 'drop-shadow(0px 0px 5px white)' : ''
            }}
          /> 
        </Grid>
      ))}
      </Grid>
  </Stack>
  )
}

export default PileStack;