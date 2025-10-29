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
import { Card, CardMedia, List, ListItem, Paper, Typography} from "@mui/material";
import { SolvedPuzzlesContext } from '/src/components/common/utils.js'
import { HORSE_PUZZLE_SOLVED } from '/src/components/common/utils.js'

// TODO: Consistent typography everywhere,
// breakdown pages for rest of puzzles, consistent usage of Puzzle / Riddle
function HorseRiddleBreakdownPage() {

  const theme = useTheme();
  const {solvedPuzzles, _} = useContext(SolvedPuzzlesContext);

  // PLACEHOLDER
  return (
    <RootBackground>
      <TopBar
        text="Puzzle Breakdown #2: The Horse Trifecta"
        isPuzzlePage={false}
        resetFunc={null}
      />
      {!solvedPuzzles.has(HORSE_PUZZLE_SOLVED) ?
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
            <Typography variant="h4" sx={{ mb: "1vh" }}>
              Solution
            </Typography>
            <Typography align="left">
              The solution to this puzzle is remeniscent of a multi-way merge sort. 
              To start, 5 ordered lists of horses are attained by conducting 5 races in which every horse is raced exactly once.
              A 6th race is conducted with the winners of the previous 5 races. The winner of this race is guaranteed to be the overall fastest horse.
              A 7th race is conducted, replacing the winner of the 6th race with the horse that came directly behind it in one of the first 5 races. The winner of this 
              race is guaranteed to be the second overall fastest  horse. An 8th race is constructed in the same fashion - the winner of the 7th race is replaced with the horse that came directly behind it in one of the first 5 races. The winner of this
              race is guaranteed to be the third overall fastest horse. Thus, we have found the fastest 3 horses in only 8 races!

              <br /> <br />
              But wait, we can optimize this solution and do slightly better! First, let's define group 1 as the 5 horses the winner of race 6 was initially grouped with, group 2 as
              the 5 horses the runner-up of race 6 was initially grouped with, and so on. Notice that ALL horses from groups 4 and 5 already have at least
              3 horses that are faster than them. Therefore, we should exclude them from any future races, as these horses cannot be the 2nd or 3rd overall fastest. In fact,
              after the 6th race, there are only a couple horses that have the potential to be the 2nd or 3rd fastest:
              <List sx={{display: "flex", alignItems: "center", listStyleType:"disc"}}>
                <ListItem sx={{ display: 'list-item', width: "90%"}}>
                  <b>If all three fastest horses were placed into the same initial group:</b><br/> 
                The 2nd and 3rd fastest horses must be the 2nd and 3rd place finishers of group 1.
                   </ListItem>
                    <ListItem  sx={{ display: 'list-item', width: "90%" }}><b>If the two fastest horses were placed into the same initial group:</b><br />
                    The 2nd and 3rd fastest horses must be the 2nd place finisher of group 1 and the 1st place finisher of group 2.
                   </ListItem>
                    <ListItem  sx={{ display: 'list-item', width: "90%" }}><b>If the second and third fastest horses were placed into the same initial group:</b><br /> 
                    The 2nd and 3rd fastest horses must be the 1st and 2nd place finishers of group 2.
                   </ListItem>
                    <ListItem  sx={{ display: 'list-item', width: "90%" }}><b>If the fastest and third fastest horses were placed into the same initial group:</b> < br />
                       The 2nd and 3rd fastest horses must be the first place finisher of group 2 and the 2nd place finisher of group 1.
                   </ListItem>
                        <ListItem  sx={{ display: 'list-item', width: "90%" }}><b>If none of the fastest three horses were placed into the same initial group:</b> <br />
                        The 2nd and 3rd fastest horses must be the winners of groups 2 and 3. 
                   </ListItem>
                </List>

                Notice that there are only 5 distinct horses vying for the remaining two spots in the trifecta - 
                the 2nd and 3rd place finishers from group 1, the 1st and 2nd place finishers from group 2, 
                and the 1st place finisher from group 3. Thus, for our 7th race, we can simply race these 5 horses and declare the fastest two our overall second and third fastest horses! We've now found the fastest 3 horses in just 7 races, the optimal solution! <br /> <br />
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
              <StyledBreakdownCardContent>
                <Typography align="center">
                  If a rat is currently in house 6 or 8, it must move to either
                  house 5 or 7 on the next day.
                </Typography>
              </StyledBreakdownCardContent>
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
              <StyledBreakdownCardContent>
                <Typography align="center">
                  The graph built for a 4 day solution. Each row represents a day.
                </Typography>
              </StyledBreakdownCardContent>
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
           
          </Box>
        </Fade>
      :
      <RiddleNotComplete puzzleNumber={2} puzzleTitle={"The Horse Trifecta"} />}
    </RootBackground>
  );
}

export default HorseRiddleBreakdownPage;
