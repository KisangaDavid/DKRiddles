import { useState, useRef, useEffect, useContext } from "react";

import TextField from "@mui/material/TextField";
import Fade from "@mui/material/Fade";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import BreakdownUnlockedNotification from "../_common/BreakdownUnlockedNotification.jsx";
import { SolvedPuzzlesContext, RAT_PUZZLE_P2 } from "../_common/utils.js";
import { useTheme } from "@mui/material/styles";

function BonusChallenge({checkBonusAnswer, setConfetti, totalDays}) {
  const theme = useTheme();
  const inputRef = useRef(null);
  const [numBonusHouses, setNumBonusHouses] = useState(null);
  const [answerToBonus, setAnswerToBonus] = useState(-1);
  const [bonusSubmitted, setBonusSubmitted] = useState(false);
  const [bonusCorrect, setBonusCorrect] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const { solvedPuzzles, setSolvedPuzzles } = useContext(SolvedPuzzlesContext);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.select();
    }
    if (numBonusHouses === null) {
      setNumBonusHouses(Math.floor(Math.random() * 10 + 20));
    }
  }, []);

  const submitBonusAnswer = () => {
    if (checkBonusAnswer(numBonusHouses, answerToBonus)) {
      setConfetti(true);
      setBonusCorrect(true);
      setNotificationOpen(true);
      const newSolvedPuzzles = new Set(solvedPuzzles);
      newSolvedPuzzles.add(RAT_PUZZLE_P2);
      setSolvedPuzzles(newSolvedPuzzles);
      console.log("set puzzles!")
    }
    setBonusSubmitted(true);
  };

  const handleBonusAnwerChange = (e) => {
    const intsOnly = e.target.value.replace(/[^0-9]/g, "");
    e.target.value = intsOnly;
    intsOnly.length < 1 ? setAnswerToBonus(-1) : setAnswerToBonus(intsOnly);
  };

  return (
    <>
      <BreakdownUnlockedNotification
        open={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        text="Rat Puzzle Breakdown Part 2 Unlocked!"
        href="ratRiddle/breakdown"
      />
      <Fade
        in={bonusSubmitted && bonusCorrect}
        mountOnEnter
        unmountOnExit
        timeout={theme.transitions.duration.standardTextFade}
      >
        <p>
          Just as you finish writing in your answer, you hear a booming voice
          from the heavens: <br /> <br />
          <b>
            <i>
              Congratulations, that is correct! You have successfully completed
              envelope #1, and are one step closer to becoming my chosen
              successor, the new Mr. Riddle Man. Take pride in your success!
            </i>
          </b>
        </p>
      </Fade>
      <Fade
        in={bonusSubmitted && !bonusCorrect}
        mountOnEnter
        unmountOnExit
        timeout={theme.transitions.duration.standardTextFade}
      >
        <p>
          As you finish writing in your answer, you hear a booming voice from
          the heavens: <br /> <br />
          <b>
            <i>
              Incorrect! I had high hopes, but it seems you are unworthy to
              carry on the Riddle Man legacy...
            </i>
          </b>
          <br /> <br />
          Reset the puzzle to try again!
        </p>
      </Fade>
      {!bonusSubmitted && (
        <Fade
          in={!bonusSubmitted}
          mountOnEnter
          unmountOnExit
          timeout={theme.transitions.duration.standardTextFade}
        >
          <Box>
            <p>
              You set the traps, and on the {totalDays}th day catch the rat!
              Just as you go to grab it, the rat suddenly disappears in a flash
              of smoke, leaving behind a note smelling faintly of cheese. The
              note reads: <br />
              <br />
              <i>
                Spectacular, you have caught my rat in only {totalDays} days.
                That is the optimal solution! Now, imagine that instead of 8
                houses, there were {numBonusHouses}. Assuming an optimal
                strategy, how many days would it take to catch the rat? Write
                your answer below.
              </i>
            </p>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box sx={{ textAlign: "center", position: "relative" }}>
                <TextField
                  sx={{}}
                  id="bonusAnswer"
                  variant="outlined"
                  size="small"
                  autoComplete="off"
                  label="Number of days"
                  onChange={handleBonusAnwerChange}
                  slotProps={{ htmlInput: { ref: inputRef } }}
                />
                <Box
                  style={{
                    position: "absolute",
                    right: -50,
                    top: 0,
                    width: "auto",
                  }}
                >
                  <Zoom in={answerToBonus != -1} mountOnEnter unmountOnExit>
                    <Fab
                      color="primary"
                      size="small"
                      onClick={() => submitBonusAnswer()}
                    >
                      <SendIcon />
                    </Fab>
                  </Zoom>
                </Box>
              </Box>
            </Box>
          </Box>
        </Fade>
      )}
    </>
  );
}

export default BonusChallenge;
