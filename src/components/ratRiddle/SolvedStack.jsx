import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import BonusChallenge from "./BonusChallenge.jsx";
import { useTheme } from "@mui/material/styles";
import { useState, useContext, useEffect } from "react";
import { SolvedPuzzlesContext } from "/src/components/common/utils.js";
import {RAT_PUZZLE_BASE_SOLVED, RAT_PUZZLE_BONUS_SOLVED} from "/src/components/common/constants.js";
import BreakdownUnlockedNotification from "../common/BreakdownUnlockedNotification.jsx";

function SolvedStack({ totalDays, checkBonusAnswer, setConfetti }) {
  const theme = useTheme();
  const [notificationOpen, setNotificationOpen] = useState(totalDays == 4);

  const { solvedPuzzles, setSolvedPuzzles } = useContext(SolvedPuzzlesContext);

  useEffect(() => {
    if (totalDays == 4 && !solvedPuzzles.has(RAT_PUZZLE_BASE_SOLVED)) {
      const newSolvedPuzzles = new Set(solvedPuzzles);
      newSolvedPuzzles.add(RAT_PUZZLE_BASE_SOLVED);
      console.log("use effect fired!");
      setSolvedPuzzles(newSolvedPuzzles);
    }
  }, [totalDays]);

  return (
    <Box sx={{ position: "relative", top: "-4vw" }}>
      {totalDays == 4 ? 
        <>
          <BonusChallenge
            numBonusHouses={Math.floor(Math.random() * 10 + 20)}
            totalDays={totalDays}
            checkBonusAnswer={checkBonusAnswer}
            setConfetti={setConfetti}
          />
          <BreakdownUnlockedNotification
            open={notificationOpen}
            onClose={() => setNotificationOpen(false)}
            text="Rat Riddle Puzzle Breakdown Unlocked!"
          />
        </>
      : 
        <Fade
          in={true}
          mountOnEnter
          unmountOnExit
          timeout={theme.transitions.duration.standardTextFade}
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
