import { useState, useRef, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Zoom from "@mui/material/Zoom";
import Fab from '@mui/material/Fab';
import Box from "@mui/material/Box";
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from '@mui/material/styles';

function BonusChallenge({numBonusHouses, checkBonusAnswer, setConfetti}) {

    const theme = useTheme();
    const inputRef = useRef(null);
    const [answerToBonus, setAnswerToBonus] = useState(-1);
    const [bonusSubmitted, setBonusSubmitted] = useState(false);
    const [bonusCorrect, setBonusCorrect] = useState(false);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.select();
      }
    }, []);

    const submitBonusAnswer = () => {
      if (checkBonusAnswer(numBonusHouses, answerToBonus)) {
        setConfetti(true);
        setBonusCorrect(true);

      }
      setBonusSubmitted(true);
    }

    const handleBonusAnwerChange = (e) => {
        const intsOnly = e.target.value.replace(/[^0-9]/g, '');
        e.target.value = intsOnly;
        intsOnly.length < 1 ? setAnswerToBonus(-1) : setAnswerToBonus(intsOnly)
    }
    
  return (
    <>
    <Zoom in={bonusSubmitted && bonusCorrect} mountOnEnter unmountOnExit>
        <p> 
          Congratulations, that is correct! You have successfully solved this puzzle - 
          use the sidebar to try another or read about how the 
          page was made!
          </p> 
          </Zoom>
       <Zoom in={bonusSubmitted && !bonusCorrect} mountOnEnter unmountOnExit>
        <p> That's not right! Reset the puzzle to try again. </p>
        </Zoom>
      
      {!bonusSubmitted &&
        <>
          <p> 
            Imagine that instead of 8 houses, there are {numBonusHouses} houses. 
            What is the minimum amount of days needed to catch the rat, following the same rules as above?
          </p>
          <Box sx={{display: "flex", justifyContent: "center"}}>
            <Box sx={{textAlign: "center", position: "relative"}}>
              <TextField
                sx={{}}
                id="bonusAnswer"
                variant="standard" 
                label="Number of days"
                onChange={handleBonusAnwerChange}
                slotProps={{ htmlInput: { 'ref': inputRef}}}
              />
              <Box style={{ position: "absolute", right: -50, top: 0, width: "auto"}}>
                <Zoom in={answerToBonus != -1} mountOnEnter unmountOnExit> 
                  <Fab color="primary" size = "small" onClick={() => submitBonusAnswer()}>
                    <SendIcon />
                  </Fab>
                </Zoom>
              </Box>
            </Box>
          </Box>
        </>}
      </>);
}

export default BonusChallenge;
