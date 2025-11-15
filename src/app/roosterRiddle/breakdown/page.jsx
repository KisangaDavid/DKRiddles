'use client'

import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TopBar from "../../_common/TopBar.jsx";
import RiddleNotComplete from "../../_common/RiddleNotComplete.jsx";
import { SolvedPuzzlesContext, ROOSTER_PUZZLE } from "../../_common/utils.js";
import { StyledBreakdownCard, StyledBreakdownCardContent } from "../../_common/BreakdownCard";

function AboutRoosterRiddle() {
  const theme = useTheme();
  const { solvedPuzzles, _ } = useContext(SolvedPuzzlesContext);

  return (
    <>
      <TopBar
        text="Puzzle Breakdown #3: The Undefeated Rooster"
        isPuzzlePage={false}
        resetFunc={null}
      />
      {solvedPuzzles.has(ROOSTER_PUZZLE) ? (
        <Fade
          in={true}
          mountOnEnter
          unmountOnExit
          timeout={theme.transitions.duration.standardTextFade}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "65%",
              position: "relative",
              pb: "10em",
              mt: "2vh",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" sx={{ mb: "2vh" }}>
              Proof of Winning Strategy
            </Typography>
            <Typography align="left">
              Before we start with a proof of the winning strategy, let's define
              one term which will be used extensively throughout this page:
              nim-sum. The nim-sum of a set of numbers is simply the result of
              applying bitwise XOR ⊕ over the entire set. For example, the
              nim-sum of 4, 5, and 6 is equivalent to 100 ⊕ 101 ⊕ 110 = 011 = 3.
              <br /> <br />
              For our proof of the winning strategy, we will need to prove three
              intermediary lemmas: 
            </Typography>
            <List>
              <ListItem>
                1. The winning move always results in a position where the
                nim-sum is 0
              </ListItem>
              <ListItem>
                2. If the nim-sum of a position is already 0, then there is no
                valid move that results in a position with a nim-sum of 0
              </ListItem>
              <ListItem>
                3. If the nim-sum of a position is not 0, there exists a move
                that results in a position with a nim-sum of 0
              </ListItem>
            </List>
            <br />
            <Typography variant="h6" align="left" sx={{ width: "100%" }}>
              Lemma #1: The winning move always results in a position where the
              nim-sum is 0 
            </Typography>
            <br />
            <Typography align="left" sx={{ width: "85%" }}>
              This lemma is trivial. Simply notice that a winning move results
              in there being 0 kernels left in all piles. The nim-sum of any set
              made up entirely of 0s is 0. 
            </Typography>
            <br />
            <Typography variant="h6" align="left" sx={{ width: "100%" }}>
              Lemma #2: If the nim-sum of a position is already 0, then there is
              no valid move that results in a position with a nim-sum of 0
            </Typography>
            <br />
            <Typography align="left" sx={{ width: "85%" }}>
              To prove this lemma, let's first assume that there exists a valid
              move from a position with a nim-sum of 0 to a position with a
              nim-sum of 0. Let <i>N<sub>-p</sub></i> be the nim-sum of all piles 
              except for pile <i>P</i>, the pile in which this move occurs. 
              Additionally, let <i>k</i> be the number of kernels in <i>P</i>,
              and <i>k'</i> be the number of kernels in<i>P</i> after the above
              move is played. <br />
              <br />
              If all of the above is true, then it holds that 
              both <i>k</i> ⊕ <i>N<sub>-p</sub></i>= 0 
              and <i>k'</i> ⊕ <i>N<sub>-p</sub></i>= 0.
              Combining the equations gives <i>k</i> ⊕ {" "}
              <i>N<sub>-p</sub></i> ⊕ <i>k'</i> ⊕ <i>N<sub>-p</sub></i> {" "} 
              = <i>k</i> ⊕ <i>k'</i> = 0. 
              This is true if and ONLY if <i>k'</i> = <i>k</i>. Taking 0 kernels
              from a pile is not a valid move, so the lemma
              is proven.
            </Typography>
            <br /> 
            <Typography variant="h6" align="left" sx={{ width: "100%" }}>
              Lemma #3: If the nim-sum of a position is not 0, there exists a
              move that results in a position with a nim-sum of 0
            </Typography>
            <br />
            <Typography align="left" sx={{ width: "85%" }}>
              This lemma is a little more involved. First, let's define the
              shorthand <i>X<sub>y</sub></i>. This is the value of the bit in 
              position <i>y</i> of <i>X's</i> binary representation. We'll 
              additionally define <i>N</i> to be the nim-sum of all of the 
              remaining piles, and <i>i</i> to be the position of the most 
              significant 1 bit in <i>N</i>. 
            </Typography>
            <br />
            <StyledBreakdownCard>
              <CardMedia
                sx={{
                  alignItems: "center",
                }}
              >
                <Paper
                  sx={{
                    backgroundColor: "hsla(209, 44%, 11%, 1.00)",
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                   <pre style={{marginTop: 10}}>
                    {"  "}Pile  | Num in Pile | Binary <br/>
                        ------------------------------- <br/>
                        Pile A  |      4      |   100  <br/>
                        Pile B  |      5      |   101  <br/>
                        Pile C  |      6      |   110  <br/>
                  </pre>
                  <Typography align="left" sx={{ mb: "10px" }}>
                    <i>N</i> (nim-sum of all piles): 100 ⊕ 101 ⊕ 110 = 011 <br />
                    <i>i</i> (position of most significant 1 bit in <i>N</i>): 2 <br />
                    <i>A<sub>i</sub></i> (value of bit at position <i>i</i> in pile <i>A</i>): 0 <br />
                    <i>B<sub>i</sub></i> (value of bit at position <i>i</i> in pile <i>B</i>): 0 <br />
                    <i>C<sub>i</sub></i> (value of bit at position <i>i</i> in pile <i>C</i>): 1 <br />
                  </Typography>
                </Paper>
              </CardMedia>
              <StyledBreakdownCardContent>
                <Typography align="center">
                  The defined terms for a sample position with piles of sizes 4,
                  5, and 6.
                </Typography>
              </StyledBreakdownCardContent>
            </StyledBreakdownCard>
            <br />
            <Typography align="left" sx={{ width: "85%" }}>
              Using the above definitions, there must exist at least one 
              pile <i>P</i> where <i>P<sub>i</sub></i> = 1. This is due to the 
              fact that if all piles had a 0 in their<i>i</i>th position, 
              then<i> N<sub>i</sub></i> would also be 0, contradicting our 
              definition of <i>i</i>. We will play in this pile, and reduce the 
              number of kernels in <i>P</i> from <i>k</i> to <i>k'</i>. We can 
              construct a <i>k'</i> that forces the resulting nim-sum of all the 
              piles <i>N'</i> to be 0 by simply 
              setting <i>k'</i> = <i>k</i> ⊕ <i>N</i>. (Intuitively, we
              just flip the value of bits in <i>k</i> at any
              position <i>j</i> where <i>N<sub>j</sub></i> = 1. This ensures 
              that <i>N'</i> = 0). Since <i>P<sub>i</sub></i> = 1 
              and <i>N<sub>i</sub></i> = 1, the most significant bit that is 
              changed in the transformation from <i>k</i> to <i>k'</i> will 
              always be flipped from 1 to 0, ensuring that <i>k' {"<"} k.</i> Thus,
              in a position where the nim-sum is not already 0, we can always 
              play a move that results in a nim-sum of 0 by by reducing the 
              number of kernels in pile <i>P</i> from <i>k</i> to <i>k'</i>.
            </Typography>
            <br /> 
            <Typography variant="h6" align="left" sx={{ width: "100%" }}>
              Putting it all together
            </Typography>
            <br />
            <Typography align="left" sx={{ width: "85%" }}>
              Combining all three lemmas reveals the winning strategy: on each
              of your turns, play a move which results in a position with a
              nim-sum of 0. This is is guaranteed to exist if the position does
              not already have a nim-sum of 0 (lemma #3). Your opponent will be
              forced to play a move that results in a non-zero nim-sum (lemma
              #2). This cycle will continue until the winning move is played.
              Since the winning move must result in a position with a nim-sum of
              0 (lemma #2), you will always win!
              <br /> <br />
              If you found this breakdown interesesting and would like to learn
              more, check out the{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://en.wikipedia.org/wiki/Nim"
              >
                Wikipedia page on Nim!
              </a>
            </Typography>
            <br /> <br />
            <Typography align="center" variant="h4" sx={{ mb: "2vh" }}>
              Implementation
            </Typography>
            <Typography align="left">
              This puzzle's implementation is quite straightforward - on each of
              the rooster's turns, the nim-sum of the position is calculated. If
              the nim-sum is non-zero, a move derived from the strategy defined
              above is played. If the nim-sum is already 0, then a random move
              is played. During the initial setup, the amount of kernels in each
              pile is randomized. If the resulting position happens to have a
              nim-sum of 0, one kernel is added to a random pile, ensuring that
              the player always has a winning strategy if they play optimally.
            </Typography>
          </Box>
        </Fade>
      ) : (
        <RiddleNotComplete
          puzzleNumber={3}
          puzzleTitle={"The Undefeated Rooster"}
        />
      )}
    </>
  );
}

export default AboutRoosterRiddle;
