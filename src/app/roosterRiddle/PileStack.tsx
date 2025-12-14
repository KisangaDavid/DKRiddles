import { useEffect, useState } from 'react';
import Stack from "@mui/material/Stack";
import Image from 'next/image';
import kernelImg from "../../assets/kernel.png";
import Zoom from '@mui/material/Zoom';
import Grid from "@mui/material/Grid";
import { shortImageZoom } from '../_common/utils';

const NUM_COLUMNS_OF_KERNELS = 3;
const MAX_NUM_KERNELS = 12;

interface props {
  pileKernels: Array<number>;
  pileNum: number;
  selectedKernels: Set<number>;
  handleKernelClick: (idx: number, pileNum: number) => void;
  canBeSelectedFrom: boolean;
  setSelectedKernels: (selectedKernels: Set<number>) => void;
   
}
function PileStack({pileKernels, pileNum, selectedKernels, canBeSelectedFrom, handleKernelClick} : props) {

  const [randomRotations, setRandomRotations] = useState([...Array(MAX_NUM_KERNELS)]);

  useEffect(() => {
    setRandomRotations([...Array(MAX_NUM_KERNELS)].map(() => Math.random() * 360))
  },[])

  return (
    <Stack
      direction="column"
      spacing={1}
      sx={{mb: "1em",}}
    >
      <p style={{padding: "5px"}}>There {pileKernels.length == 1 ? "is" : "are"} {pileKernels.length} kernel{pileKernels.length == 1 ? "" : "s"} in pile {pileNum + 1}</p>
      <Grid
        container
        rowSpacing={1} columnSpacing={0}
        columns={NUM_COLUMNS_OF_KERNELS}
        direction="row"
      >
        {[...Array(MAX_NUM_KERNELS)].map((_, idx) => (
          <Zoom key={idx} in={pileKernels.includes(idx)} timeout={shortImageZoom}>
            <Grid size={1}
              flexDirection="column"
              justifyContent="center" 
              alignItems="center"
              style={{display: "flex", overflow: "clip" }}
            >  
              <Image
                src={kernelImg}
                alt="kernel"
                onClick= {() => handleKernelClick(idx, pileNum)}
                style={{
                  cursor: (canBeSelectedFrom) ? 'pointer' : 'default',
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