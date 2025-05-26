import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { useTheme } from '@mui/material/styles';

function SolvedStack({totalDays, setBonusChallenge}) {
  const theme = useTheme();
  return (
    <> 
      {totalDays == 4 ? 
        <p>
          Impressive work! You found the rat in just {totalDays} days, which
          is optimal. Now try your hand at the extra tough bonus challenge!
        </p>
        : 
        <p>
          Good work, you found the rat in {totalDays} days! It's possible to
          find the rat in even fewer days though, reset the puzzle to try
          again!
        </p>
      }
      <Stack
        direction="row"
        justifyContent="center" 
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
        <Button 
          variant="contained" 
          onClick={() => setBonusChallenge(true)}
        >
          Bonus Challenge
        </Button>
      </Stack>    
    </>
  );
}

export default SolvedStack;
