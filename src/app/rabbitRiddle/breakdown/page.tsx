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
import FourDayGraphImg from '../../../assets/FourDayGraph.png';
import ValidGraphImg from '../../../assets/ValidGraph.png';
import InvalidGraphImg from '../../../assets/InvalidGraph.png';
import RatRiddleAboutPic1Img from '../../../assets/RatRiddleAboutPic1.jpg';
import RatRiddleBreakdownPart2FullImg from '../../../assets/RatRiddleBreakdownPart2Full.png';
import RatRiddleAlternatingImg from '../../../assets/RatRiddleAlternating.png';
import RatRiddleBreakdown12HousesImg from '../../../assets/RatRiddleBreakdown12Houses.png';

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
              Part 1: Intuition
            </Typography>
          </Box>
        </Fade>
      :
      <RiddleNotComplete puzzleNumber={4} puzzleTitle={"Jumping Rabbits"} blogLink={rabbitBlogLink}/>}
    </>
  );
}

export default RatRiddleBreakdownPage;
