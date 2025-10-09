import { useTheme } from '@mui/material/styles';
import angryGuard from "/src/assets/angryGuard.jpeg";
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";

const MIN_NUM_RACES = 7;

function HorseRiddleResults({numRaces, setConfetti,}) {
  const theme = useTheme();
  if (numRaces == MIN_NUM_RACES) {
    setConfetti(true);
  }
  return (
    <Box>
      {numRaces == MIN_NUM_RACES ?
        <Fade in={true} mountOnEnter unmountOnExit timeout={theme.transitions.duration.standardTextFade}>
          <p>
            After {numRaces} races, you correctly deduce the fastest three horses!
            You tiptoe back out of the racetrack, successfully sneaking by the
            snoring guard you put to sleep earlier. <br /> <br />
            The next day you return to the racetrack, place a trifecta bet using
            your knowledge from the night before ... and win a massive million
            dollar payout! As you make your way through the crowds to claim your
            winnings, a folded note is surreptitiously pressed into your hand. The
            note reads: <br /> <br />
            <i>
              <b>
                You have successfully completed envelope #2, and are one step
                closer to becoming my chosen successor, the new Mr. Riddle Man.
                Take pride in your success!
              </b>
            </i>
          </p>
        </Fade>
      : 
        <Grid 
          container 
          spacing={4} 
          columns={12} 
          direction = "row" 
          sx={{
            display: "flex",
            flexGrow: 1,
            overflow: "hidden"
          }}
        >
          <Grid size={{ sm: 12, lg: 6 }}>
            <Fade in={true} mountOnEnter unmountOnExit timeout={theme.transitions.duration.standardImageFade}>
              <img src={angryGuard} style={{objectFit: "contain", height: "100%", width: "100%", borderRadius: (theme.vars || theme).shape.borderRadius}}/>
            </Fade>
          </Grid>
          <Grid size={{ sm: 12, lg: 6}} style={{display: "flex", justifyContent: 'center', alignItems: "center"}}>   
            <Fade in={true}  mountOnEnter unmountOnExit timeout={theme.transitions.duration.longTextFade}>           
              <p style={{ textAlign: 'center' }}>
                After {numRaces} races, you correctly deduce the fastest three horses.
                However, you've taken too much time - as you are sneaking out of
                the racetrack, you are caught by a slightly drowsy but very much awake
                security guard! You are beaten mercilessly and sentenced to 6 months in jail.<br /> <br />
                <b>Reset the puzzle to try again!</b>
              </p>
            </Fade>
          </Grid>
        </Grid>
      }
    </Box>
  );
}

export default HorseRiddleResults;
