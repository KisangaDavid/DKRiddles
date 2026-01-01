'use client'

import { useContext } from 'react';
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TopBar from "../../_common/TopBar";
import RiddleNotComplete from "../../_common/RiddleNotComplete";
import { StyledBreakdownCard, StyledBreakdownCardContent } from "../../_common/BreakdownCard";
import { SolvedPuzzlesContext, standardTextFade, RABBIT_PUZZLE_P1, RABBIT_PUZZLE_P2, rabbitBlogLink } from '../../_common/utils'
import rabbitSolution from '../../../assets/rabbitSolution.gif'
import rabbitMapping from '../../../assets/rabbitMappings.png'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

function RatRiddleBreakdownPage() {

  const {solvedPuzzles} = useContext(SolvedPuzzlesContext);

  return (
    <>
      <TopBar
        text="Puzzle Breakdown #4: Jumping Rabbits"
        isPuzzlePage={false}
        resetFunc={undefined}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: {lg: "65%", xs: "var(--pageWidthPercent)"},
          position: "relative",
          mt: "2vh",
          pb: "10em",
          alignItems: "center",
        }}
      >
      {solvedPuzzles.has(RABBIT_PUZZLE_P1) ?
        <Fade
          in={true}
          mountOnEnter
          unmountOnExit
          timeout={standardTextFade}
        >
            <Box>
            <Typography variant="h4" sx={{ mb: "2vh" }}>
              Part 1: Solution
            </Typography>
            <Typography align="left">
              The first step to solving the puzzle is figuring out how the rabbits move. With a little fiddling, the rules of rabbit movement are uncovered:
            </Typography>
              <List>
                <ListItem>
                  1. A rabbit may only move in the direction it is facing.
                </ListItem>
                <ListItem>
                  2. A rabbit may move one space forward to an open spot, or it may jump over one other rabbit to reach an open spot.
                </ListItem>
              </List>
              <Typography align="left">
                With the rules settled, we move on to the winning strategy. The key trick to this puzzle is that the rabbits 
                must be "interwoven". That is, we should never perform a move that puts two rabbits of the same color next 
                to each other (until they reach their ending positions). This prevents deadlocks, situations in which 
                there are no valid moves. That's it! Performing moves that interweave the rabbits and prevent premature 
                deadlocks will naturally lead you to the solution: <br />
                <br />
              </Typography>
            <StyledBreakdownCard>
              <CardMedia
                component="img"
                image={rabbitSolution.src}
                sx={{
                  width: "100%",
                  objectFit: "contain",
                }}
              />
              <StyledBreakdownCardContent>
                <Typography align="center">
                  Animation showing the solution
                </Typography>
              </StyledBreakdownCardContent>
            </StyledBreakdownCard>

            <br />
            <br />
            <br />

          </Box>
        </Fade>
      :
        <RiddleNotComplete puzzleNumber={4} puzzleTitle={"Jumping Rabbits"} blogLink={rabbitBlogLink}/>}
      {solvedPuzzles.has(RABBIT_PUZZLE_P2) ? 
        <>
          <Typography variant="h4" sx={{ mb: "2vh" }}>
            Part 2: Solution
          </Typography>
            <Typography align="left">
              To calculate how many moves it takes to rearrange a group consisting of <i>n</i> rabbits of each color, we first calculate how many total spaces
              the rabbits must traverse in order to reach their ending positions. To reach its ending position, the furthest left-most white rabbit must swap places with the furthest left-most black rabbit,
              the 2nd furthest left-most white rabbit must swap places with the 2nd furthest left-most black rabbit, and so on. This is illustrated in the visualization below:

              </Typography>
              <br />    
                <StyledBreakdownCard>
              <CardMedia
                component="img"
                image={rabbitMapping.src}
                sx={{
                  width: "100%",
                  objectFit: "contain",
                }}
              />
              <StyledBreakdownCardContent>
                <Typography align="center">
                  Each rabbit must switch positions with the opposing rabbit of the corresponding color to reach their ending position.
                </Typography>
              </StyledBreakdownCardContent>
            </StyledBreakdownCard>
            <br />
              <Typography align = "left">
              <br />
              From the above, we can clearly see that each rabbit must traverse <i>n + 1</i> spaces to reach its ending position. 
              Multiplying the total number of rabbits, <i>2n</i>, by the number of spaces each rabbit needs to traverse, <i>n + 1</i>, gives us an expression
              for the total number of spaces the rabbits (as a whole) must traverse: <i>2n * (n + 1) = 2n<sup>2</sup> + 2n</i>. <br />
              <br />

              Now, notice that a "standard" move advances a rabbit by 1 space, while a "jump" advances a rabbit by 2 spaces. 
              This fact allows us to calculate the number of moves needed to rearrange the rabbits. We simply subtract the number of jumps
              performed from the total number of spaces the rabbits must traverse! Finding the total number 
              of jumps performed is simple - each of the <i>n</i> white rabbits must jump over or be jumped over by each of the <i>n</i> black rabbits.
              Regardless of which scenario happens, a jump is performed, so the total number of jumps that occur while rearranging
              the rabbits is <i>n<sup>2</sup></i>.
              <br />
              <br />
              Subtracting the number of jumps performed from the total number of spaces the rabbits must traverse gives us the exact formula for the number of moves needed to rearrange the rabbits: <i>2n<sup>2</sup> + 2n - n<sup>2</sup> = n<sup>2</sup>+2n</i>
            </Typography>
          </>
      :
        <Typography align="left">
          Complete part 2 of <i>Jumping Rabbits</i> to unlock the 
          rest of the puzzle breakdown! If you're truly stumped on part 
          2, <a target="_blank" href={rabbitBlogLink}>check out this blog post!</a>
        </Typography>}
        </Box>
    </>
  );
}

export default RatRiddleBreakdownPage;
