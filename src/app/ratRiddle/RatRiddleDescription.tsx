import { useTheme } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import { standardTextFade } from '../_common/utils';

function RatRiddleDescription() {
  const theme = useTheme();

  return (
    <Fade in={true} mountOnEnter unmountOnExit timeout={standardTextFade}>
      <Box sx={{ width: 'var(--pageWidthPercent)', position: "relative", mb: "1vh" }}>
        <p>
          You open the first envelope. Inside you find a notecard, along with two rat
          traps. The notecard reads: <br />
          <i>
            You will find that the neighborhood adjacent to yours is suffering from a
            mysterious rat infestation. Solve their rodent problem using only the two
            provided rat traps and your own logical ability.
          </i>
        </p>
        <p>
          After some preliminary investigation, you discover that the neighborhood is actually being plagued
          by just a single sneaky rat. The rat starts in a random house and moves to an adjacent house every night.
          Each day you can trap two houses - if the rat is in one of the two houses you trap, it will be caught. 
          If you trap houses 1 and 2 on the first day, 2 and 3 on the second day, 3 and 4 on the third day, and so on,
          you can guarantee that you'll catch the rat in 7 days. However, Mr. Riddle Man will not accept
          anything but perfection - what strategy can you employ that is guaranteed to
          catch the rat in the least amount of days?
        </p>
      </Box>
    </Fade>
  );
}

export default RatRiddleDescription;
