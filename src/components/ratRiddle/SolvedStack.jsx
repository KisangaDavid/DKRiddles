import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import BonusChallenge from './BonusChallenge.jsx'
import { useTheme } from '@mui/material/styles';

function SolvedStack({totalDays, checkBonusAnswer, setConfetti}) {
  const theme = useTheme();

  return (
    <Fade in={true} mountOnEnter unmountOnExit timeout={theme.transitions.duration.standardTextFade}>
      <Box sx={{position: "relative", top: "-4vw"}}> 
        {totalDays == 4 ? 
          <BonusChallenge 
            numBonusHouses={Math.floor(Math.random() * (10) + 20)}
            totalDays = {totalDays}
            checkBonusAnswer={checkBonusAnswer}
            setConfetti={setConfetti}
          />
          : 
          <p>
            You set the traps, and on the {totalDays}th day catch the rat! Just as you go to grab it, the rat suddenly disappears in a flash of smoke, leaving behind a note smelling faintly of cheese. The note reads:<br />
            <i>Not bad, you have caught my rat in only {totalDays} days. However, a true Riddle Man must always strive for the optimal solution, and this is not it!</i><br />
            <br /> 
            Reset the puzzle to try again!
          </p>
        }
      </Box>
    </Fade>
  );
}

export default SolvedStack;
