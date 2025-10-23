import { styled, useTheme } from "@mui/material/styles";
import { useContext } from 'react';
import RootBackground from "../common/RootBackground.jsx";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import TopBar from "../common/TopBar.jsx";
import FourDayGraph from "/src/assets/FourDayGraph.png";
import ValidGraph from "/src/assets/ValidGraph.png";
import InvalidGraph from "/src/assets/InvalidGraph.png";
import RatRiddleAboutPic1 from "/src/assets/RatRiddleAboutPic1.jpg";
import RiddleNotComplete from "../common/RiddleNotComplete.jsx";
import {Card, CardContent, CardMedia, Stack, Typography} from "@mui/material";
import { SolvedPuzzlesContext } from '/src/components/common/utils.js'
import { ROOSTER_PUZZLE_SOLVED } from '/src/components/common/constants.js'

function AboutRoosterRiddle() {

  const StyledCardContent = styled(CardContent)({
      display: "flex",
      flexDirection: "column",
      padding: 8,
      paddingTop: 8,
      flexGrow: 1,
      backgroundImage:
        "radial-gradient(ellipse 55% 55% at 50% -5%, hsl(210, 100%, 16%), hsla(208, 100.00%, 3.70%, 0.64))",
      height: "100%",
      "&:last-child": {
        paddingBottom: 8,
      },
    });
  
    const theme = useTheme();
    const {solvedPuzzles, _} = useContext(SolvedPuzzlesContext);
  
    // PLACEHOLDER
    return (
      <RootBackground>
        <TopBar
          text="Puzzle Breakdown #3: The Undefeated Rooster"
          isPuzzlePage={false}
          resetFunc={null}
        />
        {!solvedPuzzles.has(ROOSTER_PUZZLE_SOLVED) ?
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
              <Typography variant="h3" sx={{ mb: "1vh" }}>
                Solution
              </Typography>
              <Typography align="left">
                Before we start with a proof of the winning strategy, let's define one term which
                will be used extensively: nim-sum. The nim-sum of a set of numbers is simply the result of applying bitwise XOR ⊕ over the entire set.
                For example, the nim-sum of 4, 5, and 6 is equivalent to 4 ⊕ 5 ⊕ 6, which equals 3. <br /> <br />
                For our proof of the winning strategy, we will first need to prove three intermediary lemmas: <br />
                1. A player can only win if their move results in a position where the nim-sum is 0 <br />
                2. If the nim-sum of the remaining piles is not 0, there exists a move that results in a position with a nim-sum of 0 <br />
                3. If the nim-sum of the remaining piles is 0, then there is no valid move that results in a position with a nim-sum of 0 
                <br /> <br />
              </Typography>
              <Typography variant="h5" align="left" sx={{width: "100%"}}>
                Lemma #1: A player can only win if their move results in a position where the nim-sum is 0 <br />
              </Typography>z
              <Typography align="left">
                This lemma is trivial. Simply notice that a winning move results in there being 0 kernels left in all piles.
                The nim-sum of any set made up exclusiely of 0s is 0 <br /> <br />
              </Typography>
              <Typography variant="h5" align="left" sx={{width: "100%"}}>
                Lemma #2: If the nim-sum of the remaining piles is not 0, there exists a move that results in a position with a nim-sum of 0<br />
              </Typography>
              <Card sx={{ padding: 0 }}>
                <CardMedia
                  component="img"
                  image={RatRiddleAboutPic1}
                  sx={{
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
                <StyledCardContent>
                  <Typography align="center">
                    If a rat is currently in house 6 or 8, it must move to either
                    house 5 or 7 on the next day.
                  </Typography>
                </StyledCardContent>
              </Card>
              <Typography align="left">
                <br />
                If the rat started in an odd numbered house, then on the third day
                it will also be in an odd numbered house (notice that the parity of
                the house number the rat is in flips each day). Thus, we can employ
                a similar strategy to before: on day 3, we check houses 5 and 7. If
                we don't find the rat, then the rat must have been in houses 1 or 3.
                Since the only houses adjacent to houses 1 and 3 are houses 2 and 4,
                we check those houses on the fourth day, guaranteeing that we catch
                the rat in only four days! <br /> <br /> <br />
              </Typography>
              <Typography align="center" variant="h4" sx={{ mb: "1vh" }}>
                Implementation
              </Typography>
              <Typography align="left">
                The first problem to solve is how to programatically verify if a
                submitted arrangement of traps will successfully catch the rat. In
                this case where there are only 8 houses and a maximum of 7 days, it
                would be completely feasible to enumerate all 316 possible paths the
                rat can take, then check if all those paths run into a trap using
                the submitted arrangement. That's inefficient and lame though! Let's
                think of something a little more elegant.
                <br /> <br />
                We can think of a submitted solution as a graph with "layers", where
                each layer corresponds to a day. Within a day / layer, we represent
                each house as a node. The edges will represent how the rat can move
                between days - for example, house 2 in the first layer will have two
                outgoing edges - houses 1 and 3 in the second layer. Connect all
                nodes in the first layer to a start node, and all nodes in the last
                layer to an end node. <br /> <br />
              </Typography>
              <Card sx={{ padding: 0, width: "50%" }}>
                <CardMedia
                  component="img"
                  image={FourDayGraph}
                  sx={{
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
                <StyledCardContent>
                  <Typography align="center">
                    The graph built for a 4 day solution. Each row represents a day.
                  </Typography>
                </StyledCardContent>
              </Card>
              <Typography align="left">
                <br />
                To check if a submitted solution is guaranteed to catch the rat,
                simply delete the nodes corresponding to trapped houses from the
                graph. Check if there still exists a route from the start node to
                the end node using a path finding algorithm of your choice. If such
                a path no longer exists, the submitted solution is guaranteed to
                catch the rat! <br /> <br />
              </Typography>
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
                  <StyledCardContent>
                    <Typography align="center">
                      An invalid solution to the puzzle. There are still many paths
                      from the start node to the end node.
                    </Typography>
                  </StyledCardContent>
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
                  <StyledCardContent>
                    <Typography align="center">
                      A valid (and optimal!) solution to the puzzle. There is no
                      longer a path from the start node to the end node.
                    </Typography>
                  </StyledCardContent>
                </Card>
              </Stack>
            </Box>
          </Fade>
        :
        <RiddleNotComplete puzzleNumber={3} puzzleTitle={"The Undefeated Rooster"} />}
      </RootBackground>
    );
  }

export default AboutRoosterRiddle;
