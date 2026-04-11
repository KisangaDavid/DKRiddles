import Box from "@mui/material/Box"

interface props {
  answerCorrect: boolean
}
function Solved({answerCorrect} : props) {
//  TODO: nested lists in <p>

  return (
    
  <Box>
    {answerCorrect ? 
      <p>
        As you finish writing in your answer, you hear a rumbling voice, seemingly coming from the earth itself: <br /> <br />
        <i>
            <b>
                You have successfully completed envelope #4, and are one step
                closer to becoming the new Riddle Man. Hurry and complete the rest of the puzzles - great power and fame awaits!
            </b> <br /> <br />
        </i>
        Although you are glad to complete another puzzle, you can't help but notice that this envelope felt ... different. A sense of unease 
        creeps in as you return to the stack of envelopes.
      </p>
    :
      <p>
        As you finish writing in your answer, you hear a rumbling voice, seemingly coming from the earth itself: <br /> <br />
        <b>
          <i>
            Incorrect! I had high hopes, but it seems you are unworthy to
            carry on the Riddle Man legacy...
          </i>
        </b>
        <br /> <br />
        Reset the puzzle to try again!
      </p>
    }
  </Box>
  )
}

export default Solved

{/* Contrary to what some books might have you think, rats are nowhere near */}