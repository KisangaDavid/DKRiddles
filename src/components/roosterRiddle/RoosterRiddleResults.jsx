import { useTheme } from '@mui/material/styles';
import angryGuard from "/src/assets/angryGuard.jpeg";
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";


function RoosterRiddleResults({gameIsWon, setConfetti}) {
  const theme = useTheme();
  if (gameIsWon) {
    setConfetti(true);
  }
  return (
    <Box>
      {gameIsWon ?
        <p> As you pick up the last kernel, you hear a booming voice from the heavens: <br /> <br />
          <b><i>Impressive work, besting my avian friend is no simple task! <br /> With this victory
              you have successfully completed envelope #3, and are one step
              closer to becoming my chosen successor, the new Mr. Riddle Man.
              Take pride in your success!
            </i></b>
          
        </p>
      : 
        <p> As the rooster smugly picks up the last kernel, you hear a booming voice from the heavens: <br /> <br />
          <b><i>Outwitted by a mere avian! I had high hopes, but it seems you are unworthy to carry on the Riddle Man legacy...</i></b> <br /> <br />
          Reset the puzzle to try again! 
        </p>
      }
    </Box>
  );
}

export default RoosterRiddleResults;
