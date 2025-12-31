'use client'

import { useContext } from 'react';
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TopBar from "../../_common/TopBar";
import RiddleNotComplete from "../../_common/RiddleNotComplete";
import { StyledBreakdownCard, StyledBreakdownCardContent } from "../../_common/BreakdownCard";
import { SolvedPuzzlesContext, RAT_PUZZLE_P1, RAT_PUZZLE_P2, ratBlogLink, standardTextFade, RABBIT_PUZZLE, rabbitBlogLink } from '../../_common/utils'
import rabbitSolution from '../../../assets/rabbitSolution.gif'
import FourDayGraphImg from '../../../assets/FourDayGraph.png';
import ValidGraphImg from '../../../assets/ValidGraph.png';
import InvalidGraphImg from '../../../assets/InvalidGraph.png';
import RatRiddleAboutPic1Img from '../../../assets/RatRiddleAboutPic1.jpg';
import RatRiddleBreakdownPart2FullImg from '../../../assets/RatRiddleBreakdownPart2Full.png';
import RatRiddleAlternatingImg from '../../../assets/RatRiddleAlternating.png';
import RatRiddleBreakdown12HousesImg from '../../../assets/RatRiddleBreakdown12Houses.png';
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
      {solvedPuzzles.has(RABBIT_PUZZLE) ?
        <Fade
          in={true}
          mountOnEnter
          unmountOnExit
          timeout={standardTextFade}
        >
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
            <Typography variant="h4" sx={{ mb: "2vh" }}>
              Solution
            </Typography>
             <Typography align="left">
              The first step to solving the puzzle is figuring out how the rabbits move. With a little fiddling, the rules of rabbit movement are uncovered:
              <List>
              <ListItem>
                1. A rabbit may only move in the direction it is facing.
              </ListItem>
              <ListItem>
                2. A rabbit may move one space forward to an open spot, or jump over one other rabbit to reach an open spot.
              </ListItem>
            </List>
              With the rules settled, we move on to the winning strategy. The key thing to notice is that the rabbits need to be "interwoven". To prevent deadlocks, we should never
              perform a move that puts two rabbits of the same color next to each other until they reach their ending positions. That's pretty much it! Performing moves that interweave the rabbits and prevents
              deadlocks leads to the solution, as seen below: <br />
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
                  Gif of the solution
                </Typography>
              </StyledBreakdownCardContent>
            </StyledBreakdownCard>
          </Box>
        </Fade>
      :
      <RiddleNotComplete puzzleNumber={4} puzzleTitle={"Jumping Rabbits"} blogLink={rabbitBlogLink}/>}
    </>
  );
}

export default RatRiddleBreakdownPage;
