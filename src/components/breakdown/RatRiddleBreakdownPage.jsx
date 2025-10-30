import { useTheme } from "@mui/material/styles";
import { useContext } from 'react';
import RootBackground from "../common/RootBackground.jsx";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import TopBar from "../common/TopBar.jsx";
import FourDayGraph from "/src/assets/FourDayGraph.png";
import ValidGraph from "/src/assets/ValidGraph.png";
import InvalidGraph from "/src/assets/InvalidGraph.png";
import RatRiddleAboutPic1 from "/src/assets/RatRiddleAboutPic1.jpg";
import RiddleNotComplete from "./RiddleNotComplete.jsx";
import StyledBreakdownCardContent from "./StyledBreakdownCardContent.jsx";
import {Card, CardMedia, Stack, Typography} from "@mui/material";
import { SolvedPuzzlesContext } from '/src/components/common/utils.js'
import { RAT_PUZZLE_BASE_SOLVED, RAT_PUZZLE_BONUS_SOLVED } from '/src/components/common/utils.js'

// TODO: Consistent typography everywhere,
// breakdown pages for rest of puzzles, consistent usage of Puzzle / Riddle
function RatRiddleBreakdownPage() {

  const theme = useTheme();
  const {solvedPuzzles, _} = useContext(SolvedPuzzlesContext);

  return (
    <RootBackground>
      <TopBar
        text="Puzzle Breakdown #1: The Sneaky Rat"
        isPuzzlePage={false}
        resetFunc={null}
      />
      {solvedPuzzles.has(RAT_PUZZLE_BASE_SOLVED) ?
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
              width: "50vw",
              position: "relative",
              mb: "8vh",
              mt: "2vh",
              alignItems: "center",
            }}
          >
            <Typography variant="h3" sx={{ mb: "2vh" }}>
              Intuition
            </Typography>
            <Typography align="left">
              To start, let's assume that the rat begins in an even numbered
              house, i.e. houses 2, 4, 6, or 8. On the first day, we trap houses 2
              and 4. If we don't catch the rat, that means the rat started in
              house 6 or 8. Now, notice that the only houses adjacent to house 6
              and 8 are houses 5 and 7. Since the rat has to move to an adjacent
              house each day, we can trap houses 5 and 7 on the second day,
              guaranteeing that we will catch the rat if it started in an even
              numbered house. If we don't find the rat on day 2, we can
              definitively conclude that the rat started in an odd numbered house!
            </Typography>
            <br />
            <Card sx={{ padding: 0 }}>
              <CardMedia
                component="img"
                image={RatRiddleAboutPic1}
                sx={{
                  width: "100%",
                  objectFit: "contain",
                }}
              />
              <StyledBreakdownCardContent>
                <Typography align="center">
                  If a rat is currently in house 6 or 8, it must move to either
                  house 5 or 7 on the next day.
                </Typography>
              </StyledBreakdownCardContent>
            </Card>
            <br /> <br />
            <Typography align="left">
              If the rat started in an odd numbered house, then on the third day
              it will also be in an odd numbered house (notice that the parity of
              the house number the rat is in flips each day). Thus, we can employ
              a similar strategy to before: on day 3, we check houses 5 and 7. If
              we don't find the rat, then the rat must have been in houses 1 or 3.
              Since the only houses adjacent to houses 1 and 3 are houses 2 and 4,
              we check those houses on the fourth day, guaranteeing that we catch
              the rat in only four days! 
            </Typography>
            <br /> <br /> <br />
            <Typography align="center" variant="h3" sx={{ mb: "2vh" }}>
              Implementation
            </Typography>
            <Typography align="left">
              The crux here is how to programatically verify if a
              submitted arrangement of traps will successfully catch the rat. In
              this case where there are only 8 houses and a maximum of 7 days, it
              would be completely feasible to enumerate all 316 possible paths the
              rat can take, then check if all those paths run into a trap using
              the submitted arrangement. That's inefficient and lame though! Let's
              think of something a little more elegant.
            </Typography>
            <br /> 
            <Typography align="left">
              We can think of a submitted solution as a graph with "layers", where
              each layer corresponds to a day. Within a day / layer, we represent
              each house as a node. The edges will represent how the rat can move
              between days - for example, house 2 in the first layer will have two
              outgoing edges - houses 1 and 3 in the second layer. Connect all
              nodes in the first layer to a start node, and all nodes in the last
              layer to an end node. 
            </Typography>
            <br />
            <Card sx={{ padding: 0, width: "50%" }}>
              <CardMedia
                component="img"
                image={FourDayGraph}
                sx={{
                  width: "100%",
                  objectFit: "contain",
                }}
              />
              <StyledBreakdownCardContent>
                <Typography align="center">
                  The graph built for a 4 day solution. Each row represents a day.
                </Typography>
              </StyledBreakdownCardContent>
            </Card>
            <br /> <br />
            <Typography align="left">
              To check if a submitted solution is guaranteed to catch the rat,
              simply remove the nodes corresponding to trapped houses from the
              graph. Check if there still exists a route from the start node to
              the end node using a simple path finding algorithm such as DFS. If such
              a path no longer exists, the submitted solution is guaranteed to
              catch the rat! 
            </Typography>
            <br />
            <Stack direction="row" gap="0.5vw">
              <Card sx={{ padding: 0, width: "100%" }}>
                <CardMedia
                  component="img"
                  image={InvalidGraph}
                  sx={{
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
                <StyledBreakdownCardContent>
                  <Typography align="center">
                    An invalid solution to the puzzle. There are still many paths
                    from the start node to the end node.
                  </Typography>
                </StyledBreakdownCardContent>
              </Card>
              <Card sx={{ padding: 0, width: "100%" }}>
                <CardMedia
                  component="img"
                  image={ValidGraph}
                  sx={{
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
                <StyledBreakdownCardContent>
                  <Typography align="center">
                    A valid (and optimal!) solution to the puzzle. There is no
                    longer a path from the start node to the end node.
                  </Typography>
                </StyledBreakdownCardContent>
              </Card>
            </Stack>
          </Box>
        </Fade>
      :
      <RiddleNotComplete puzzleNumber={1} puzzleTitle={"The Sneaky Rat"} />}
    </RootBackground>
  );
}

export default RatRiddleBreakdownPage;
