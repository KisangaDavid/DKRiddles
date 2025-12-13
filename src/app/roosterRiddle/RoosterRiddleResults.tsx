'use client'

import { useTheme } from "@mui/material/styles";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import { useState, useContext, useEffect } from "react";
import { standardTextFade, SolvedPuzzlesContext, ROOSTER_PUZZLE, SOLVED } from "../_common/utils";
import BreakdownUnlockedNotification from "../_common/BreakdownUnlockedNotification";

interface props {
  gameIsWon: boolean;
}

function RoosterRiddleResults({ gameIsWon } : props) {
  const theme = useTheme();
  const [notificationOpen, setNotificationOpen] = useState(gameIsWon);

  const { solvedPuzzles, setSolvedPuzzles } = useContext(SolvedPuzzlesContext);

  useEffect(() => {
    if (gameIsWon && !solvedPuzzles.has(ROOSTER_PUZZLE)) {
      localStorage.setItem(ROOSTER_PUZZLE, SOLVED);
      const newSolvedPuzzles = new Set(solvedPuzzles);
      newSolvedPuzzles.add(ROOSTER_PUZZLE);
      setSolvedPuzzles(newSolvedPuzzles);
    }
  }, [gameIsWon]);

  return (
    <Box sx={{justifyContent: "center"}}>
      {gameIsWon ? (
        <>
          <Fade
            in={true}
            mountOnEnter
            unmountOnExit
            timeout={standardTextFade}
          >
            <p>
              As you pick up the last kernel, you hear a booming voice from the
              heavens: <br /> <br />
              <b>
                <i>
                  Impressive work, besting my avian friend is no simple task!
                  <br /> With this victory you have successfully completed
                  envelope #3, and are one step closer to becoming my chosen
                  successor, the new Mr. Riddle Man. Take pride in your success!
                </i>
              </b>
            </p>
          </Fade>
          <BreakdownUnlockedNotification
            open={notificationOpen}
            onClose={() => setNotificationOpen(false)}
            text="Rooster Puzzle Breakdown Unlocked!"
          />
        </>
      ) : (
        <Fade
          in={true}
          mountOnEnter
          unmountOnExit
          timeout={standardTextFade}
        >
          <p>
            As the rooster smugly picks up the last kernel, you hear a booming
            voice from the heavens: <br /> <br />
            <b>
              <i>
                Outwitted by a mere avian! I had high hopes, but it seems you
                are unworthy to carry on the Riddle Man legacy...
              </i>
            </b>
            <br /> <br />
            Reset the puzzle to try again!
          </p>
        </Fade>
      )}
    </Box>
  );
}

export default RoosterRiddleResults;
