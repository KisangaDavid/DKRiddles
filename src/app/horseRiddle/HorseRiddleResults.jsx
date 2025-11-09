'use client'

import { useTheme } from '@mui/material/styles';
import { useState, useContext, useEffect } from "react";
import Image from 'next/image.js';
import angryGuard from "../../assets/angryGuard.jpeg";
import Fade from '@mui/material/Fade';
import Box from "@mui/material/Box";
import { Stack } from '@mui/material';
import BreakdownUnlockedNotification from "../_common/BreakdownUnlockedNotification.jsx";
import { SolvedPuzzlesContext, HORSE_PUZZLE } from "../_common/utils.js";

const MIN_NUM_RACES = 7;

function HorseRiddleResults({numRaces, setConfetti}) {
  const theme = useTheme();

  const [notificationOpen, setNotificationOpen] = useState(numRaces == 7);
  const { solvedPuzzles, setSolvedPuzzles } = useContext(SolvedPuzzlesContext);
  
  useEffect(() => {
    if (numRaces == MIN_NUM_RACES && !solvedPuzzles.has(HORSE_PUZZLE)) {
      const newSolvedPuzzles = new Set(solvedPuzzles);
      newSolvedPuzzles.add(HORSE_PUZZLE);
      console.log("updated horse riddle!");
      setSolvedPuzzles(newSolvedPuzzles);
    }
  }, [numRaces]);

    if (numRaces == MIN_NUM_RACES) {
      setConfetti(true);
    }

  return (
    <Box sx={{display: "flex", width: "75vw", alignItems: "center", flexGrow: 1}}>
      {numRaces == MIN_NUM_RACES ?
        <>
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
            <BreakdownUnlockedNotification
              open={notificationOpen}
              onClose={() => setNotificationOpen(false)}
              text="Horse Puzzle Breakdown Unlocked!"
              color={theme.palette.success.light}
            />
        </>
      : 
        <Stack
          justifyContent="center"
          spacing={0}
          sx={{
            display: "flex",
            flexGrow: 1,
            alignItems: "center",
            flexDirection: {
              sm: "column",
              md: "row"
            }
          }}
        >
          <Fade in={true} mountOnEnter unmountOnExit timeout={theme.transitions.duration.standardImageFade}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                 border: `1px solid hsla(0, 0%, 23%, 0.60)`,
                 borderRadius: theme.shape.borderRadius,
                 overflow:"hidden",
                mb:"1vh",
                mx: "1vw",
                width: "100%",
              }}
            > 
              <Image
                src={angryGuard}
                alt="guard"
                style={{
                  objectFit: 'cover',
                  maxHeight: "55vh",
                  width: "100%",
                  borderRadius: theme.shape.borderRadius,
                }}
              />
            </Box>
          </Fade>
          <Fade in={true}  mountOnEnter unmountOnExit timeout={theme.transitions.duration.longTextFade}>           
          <Box 
            sx={{
              display: "flex",
              flexGrow: 1,
              width: "100%",
              mx: "1vw"
            }}
          >           
            <p style={{ textAlign: 'center' }}>
              After {numRaces} races, you correctly deduce the fastest three horses.
              However, you've taken too much time - as you are sneaking out of
              the racetrack, you are caught by a slightly drowsy but very much awake
              security guard! You are beaten mercilessly and sentenced to 6 months in jail.
              <br /> <br />
              <b>Reset the puzzle to try again!</b>
            </p>
            </Box>
          </Fade>
        </Stack>
      }
    </Box>
  );
}

export default HorseRiddleResults;
