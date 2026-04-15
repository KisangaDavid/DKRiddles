import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import BonusChallenge from "./BonusChallenge";
import { useState, useContext, useEffect } from "react";
import { RAT_PUZZLE_P1, SOLVED, standardTextFade } from "../_common/constants";
import BreakdownUnlockedNotification from "../_common/BreakdownUnlockedNotification";
import { SolvedPuzzlesContext } from "../_common/SolvedPuzzlesContextProvider";

interface props {
  totalDays: number;
  setConfetti: (bool: boolean) => void;
}

function SolvedStack({ totalDays, setConfetti } : props) {
  const [notificationOpen, setNotificationOpen] = useState(totalDays == 4);
  const { markSolved } = useContext(SolvedPuzzlesContext);

  useEffect(() => {
    if (totalDays == 4) { 
      markSolved(RAT_PUZZLE_P1);
    }
  }, [totalDays]);

  
  return (
    <Box sx={{ position: "relative", top: "-4vw" }}>
      {totalDays == 4 ? 
        <>
          <BonusChallenge
            totalDays={totalDays}
            setConfetti={setConfetti}
          />
          <BreakdownUnlockedNotification
            open={notificationOpen}
            onClose={() => setNotificationOpen(false)}
            text="Rat Puzzle Breakdown Part 1 Unlocked!"
          />
        </>
      : 
        <Fade
          in={true}
          mountOnEnter
          unmountOnExit
          timeout={standardTextFade}
        >
          <Box>
            <p>
              You set the traps, and on the {totalDays}th day catch the rat!
              Just as you go to grab it, the rat suddenly disappears in a flash
              of smoke, leaving behind a note smelling faintly of cheese. The
              note reads:
              <br />
              <i>
                Not bad, you have caught my rat in only {totalDays} days.
                However, a true Riddle Man must always strive for the optimal
                solution, and this is not it!
              </i>
              <br />
              <br />
              Reset the puzzle to try again!
            </p>
          </Box>
        </Fade>
      }
    </Box>
  );
}

export default SolvedStack;
