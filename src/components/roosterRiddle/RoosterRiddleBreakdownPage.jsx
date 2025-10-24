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
import {Card, CardContent, CardMedia, Paper, Stack, Typography} from "@mui/material";
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
                For our proof of the winning strategy, we will need to prove three intermediary lemmas: <br />
                1. The winning move always results in a position where the nim-sum is 0 <br />
                2. If the nim-sum of the remaining piles is not 0, there exists a move that results in a position with a nim-sum of 0 <br />
                3. If the nim-sum of the remaining piles is 0, then there is no valid move that results in a position with a nim-sum of 0 
                <br /> <br />
              </Typography>
              <Typography variant="h5" align="left" sx={{width: "100%"}}>
                Lemma #1: The winning move always results in a position where the nim-sum is 0 <br /><br />
              </Typography>
              <Typography align="left">
                This lemma is trivial. Simply notice that a winning move results in there being 0 kernels left in all piles.
                The nim-sum of any set made up entirely of 0s is 0. <br /> <br /> <br />
              </Typography>
              <Typography variant="h5" align="left" sx={{width: "100%"}}>
                Lemma #2: If the nim-sum of the remaining piles is not 0, there exists a move that results in a position with a nim-sum of 0<br /><br />
              </Typography>
              <Typography align="left">
                This lemma is a little more involved. 
                First, let's define the shorthand <i>X<sub>y</sub></i>. This is the value of the bit in  
                position <i>y</i> of <i>X's</i> binary representation. We'll additionally define <i>N</i> to be the 
                nim-sum of all of the remaining piles, and <i>i</i> to be the position of the most significant 1
                bit in <i>N</i>. <br /> <br />
              </Typography>
              <Card  sx={{ padding: 0 }}>
                <CardMedia
                  sx={{
                    alignItems: "center"
                  }}
                >
                  <Paper sx={{
                    backgroundColor: "hsla(209, 44%, 11%, 1.00)",
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}>
                  <pre style={{marginTop: 10}}>
                    {"  "}Pile  | Num in Pile | Binary <br/>
                        ------------------------------- <br/>
                        Pile A  |      4      |   100  <br/>
                        Pile B  |      5      |   101  <br/>
                        Pile C  |      6      |   110  <br/>
                  </pre>
                  {/* <Box sx={{display: "flex", alignItems: "center"}}> */}
                  <Typography align= "left" sx={{mb: "10px"}} >
                    <i>N</i> (nim-sum of all piles): 100 ⊕ 101 ⊕ 110 = 011<br />
                    <i>i</i> (position of most significant 1 bit in <i>N</i>): 2<br />
                    <i>A<sub>i</sub></i> (value of bit at position <i>i</i> in pile <i>A</i>): 0<br />
                    <i>B<sub>i</sub></i> (value of bit at position <i>i</i> in pile <i>B</i>): 0<br />
                    <i>C<sub>i</sub></i> (value of bit at position <i>i</i> in pile <i>C</i>): 1<br /> 
                    </Typography>
                    {/* </Box> */}
                  </Paper>
                </CardMedia>
                <StyledCardContent>
                  <Typography align="center">
                    The defined terms for a sample position with piles of sizes 4, 5, and 6.
                  </Typography>
                </StyledCardContent>
              </Card>
                <Typography align="left">
                  <br/>
                Using the above definitions, there must exist at 
                least one pile <i>K</i> where <i>K<sub>i</sub></i> = 1. 
                This is due to the fact that if all piles had a 0 in 
                their <i>i</i>th position, then <i>N<sub>i</sub></i> would also be 0, 
                contradicting our definition of <i>i</i>! This pile <i>K</i> is where we'll make our move.
                Since our goal is to end up with a nim-sum of 0 across all the piles, we will take
                kernels from pile <i>K</i> until the number of kernels left is <i>K</i> with the bit in any position <i>j</i> where <i>N<sub>j</sub></i> = 1 is flipped.
                In other words, we take kernels from pile <i>K</i> until the pile contains <i>K</i> ⊕ <i>N</i> kernels. last thing guarantee always possible<br /> <br />
                
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


