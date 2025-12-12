import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import BonusChallenge from "./BonusChallenge";
import { useTheme } from "@mui/material/styles";
import { useState, useContext, useEffect } from "react";
import { SolvedPuzzlesContext, RAT_PUZZLE_P1, SOLVED, standardTextFade } from "../_common/utils";
import BreakdownUnlockedNotification from "../_common/BreakdownUnlockedNotification";

function SolvedStack({ totalDays, checkBonusAnswer, setConfetti }) {
  const theme = useTheme();
  const [notificationOpen, setNotificationOpen] = useState(totalDays == 4);
  const { solvedPuzzles, setSolvedPuzzles } = useContext(SolvedPuzzlesContext);

  useEffect(() => {
    if (totalDays == 4 && !solvedPuzzles.has(RAT_PUZZLE_P1)) {
      localStorage.setItem(RAT_PUZZLE_P1, SOLVED);
      const newSolvedPuzzles = new Set(solvedPuzzles);
      newSolvedPuzzles.add(RAT_PUZZLE_P1);
      setSolvedPuzzles(newSolvedPuzzles);
    }
  }, [totalDays]);

  return (
    <Box sx={{ position: "relative", top: "-4vw" }}>
      {totalDays == 4 ? 
        <>
          <BonusChallenge
            totalDays={totalDays}
            checkBonusAnswer={checkBonusAnswer}
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
