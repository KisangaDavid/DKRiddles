import emptyHouse from "../../assets/emptyHouse.svg";
import rat from "../../assets/rat.png";
import ratTrap from "../../assets/ratTrap.svg";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Slide from "@mui/material/Slide";
import Fade from '@mui/material/Fade'
import Zoom from "@mui/material/Zoom";
import Box from "@mui/material/Box";
import Image from 'next/image'
import { standardTextFade } from "../_common/utils";

interface props {
  NUM_HOUSES: number;
  submittedTraps: boolean; 
  trapHouse: (num: number) => void;
  curCheckedHouses: Set<number>;
  allCheckedHouses: Array<Set<number>>;
  path: Array<number>;
  curDay: number;
  prevDay: number;
}

function RowOfHouses({
  NUM_HOUSES,
  submittedTraps,
  trapHouse,
  curCheckedHouses,
  allCheckedHouses,
  path,
  curDay,
  prevDay,
}: props) {

  const getRatAnimationDirection = (index: number) => {
    if (prevDay == null) {
        return "up";
    }
    if ((path[curDay] > path[prevDay] && path[curDay] == index) ||
        (path[curDay] < path[prevDay] && path[curDay] != index)) {
      return "right";
    }
    return "left";
  };

  return ( 
    <Box>
      {(!submittedTraps || (path.length !=  0)) 
        ?
          <Fade in={true} mountOnEnter unmountOnExit timeout={standardTextFade}>
            <p> Day: {curDay + 1} </p>
          </Fade>
        :
          <p> <br /> </p>
      }
      <Grid
          container
          columnSpacing={{xs: "0.25em", md: "1em"}}
          columns={NUM_HOUSES}
          style={{ width: "100%", height: "auto"}}
      >
        {[...Array(NUM_HOUSES)].map((_, index) => (
          <Grid size={1}
              sx={{height: "auto"}}
              key={index}
          >
            <Stack spacing={0}>
              <p>{index + 1}</p>
              <Image
                  src={emptyHouse}
                  alt="house"
                  onClick={!submittedTraps ? () => trapHouse(index) : undefined}
                  style={{ 
                    cursor: !submittedTraps ? 'pointer' : 'default', 
                    objectFit: "contain", 
                    height: "100%", 
                    width: "100%"
                  }}
              />
              {/* TODO: figure out a nicer solution here */}
              <Box
                  sx={{overflow: "clip", height: {xs: "12vw", sm: "7vw"}}}
              >
                <Zoom in={curCheckedHouses.has(index)} mountOnEnter unmountOnExit>
                  <Image src={ratTrap} alt="trap" style={{objectFit: "contain", height: "85%", width: "85%"}}/>
                </Zoom>
                <Slide
                  direction={getRatAnimationDirection(index)}
                  mountOnEnter
                  unmountOnExit
                  in={submittedTraps ? path[curDay] == index: false}
                >
                  <img src={rat.src} alt="rat" style={{objectFit: "contain", height: "100%", width: "100%"}} />
                </Slide>
                <Slide
                  direction="up"
                  in={
                      path.length > 0 &&
                      submittedTraps &&
                      allCheckedHouses[curDay].has(index)
                  }
                  style = {{
                      transitionDelay:
                      submittedTraps && allCheckedHouses[curDay].has(index) ? `100ms` : `0ms`
                  }}

                >
                  <Image
                      src={ratTrap}
                      alt="trap"
                      style={{objectFit: "contain", height: "85%", width: "85%"}}
                  />
                </Slide>
              </Box>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default RowOfHouses;
