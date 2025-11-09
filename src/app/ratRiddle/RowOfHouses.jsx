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
import { useTheme } from '@mui/material/styles';

function RowOfHouses({
    NUM_HOUSES,
    submittedTraps,
    trapHouse,
    curCheckedHouses,
    allCheckedHouses,
    path,
    curDay,
    prevDay
}) {
  const theme = useTheme();

  const getRatAnimationDirection = (index) => {
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
      {(!submittedTraps || path.length != 0) 
        ?
          <Fade in={true} mountOnEnter unmountOnExit timeout={theme.transitions.duration.standardTextFade}>
            <p> Day: {curDay + 1} </p>
          </Fade>
        :
          <p> <br /> </p>
      }
      <Grid
          container
          columnSpacing="1vw"
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
              <Box
                  style={{overflow: "clip", height:"7vw"}}
              >
                <Zoom in={curCheckedHouses.has(index)} mountOnEnter unmountOnExit>
                  <Image src={ratTrap} alt="trap" style={{objectFit: "contain", height: "85%", width: "85%"}}/>
                </Zoom>
                <Slide
                  direction={getRatAnimationDirection(index)}
                  mountOnEnter
                  unmountOnExit
                  in={submittedTraps && path[curDay] == index}
                >
                  <Image src={rat} alt="rat" style={{objectFit: "contain", height: "100%", width: "100%"}} />
                </Slide>
                <Slide
                  direction="up"
                  mountOnEnter
                  unnmountOnExit
                  style = {{
                      transitionDelay:
                      submittedTraps && allCheckedHouses[curDay].has(index) ? 100 : 0
                  }}
                  in={
                      path.length > 0 &&
                      submittedTraps &&
                      allCheckedHouses[curDay].has(index)
                  }
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
