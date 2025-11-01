import emptyHouse from "/src/assets/home-color-icon.svg";
import Stack from "@mui/material/Stack";
import mouseTrap from "/src/assets/mouseTrap.svg";
import rat from "/src/assets/rat.png";
import Grid from "@mui/material/Grid";
import Slide from "@mui/material/Slide";
import Fade from '@mui/material/Fade'
import Zoom from "@mui/material/Zoom";
import Box from "@mui/material/Box";
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
              <img
                  src={emptyHouse}
                  onClick={!submittedTraps ? () => trapHouse(index) : undefined}
                  style={{ cursor: !submittedTraps ? 'pointer' : 'default' }}
              />
              <Box
                  style={{overflow: "clip", height:"7vw"}}
              >
                <Zoom in={curCheckedHouses.has(index)} mountOnEnter unmountOnExit>
                  <img src={mouseTrap} style={{objectFit: "contain", height: "85%", width: "85%"}}/>
                </Zoom>
                <Slide
                  direction={getRatAnimationDirection(index)}
                  mountOnEnter
                  unmountOnExit
                  in={submittedTraps && path[curDay] == index}
                >
                  <img src={rat} style={{objectFit: "contain", height: "100%", width: "100%"}} />
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
                  <img
                      src={mouseTrap}
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
