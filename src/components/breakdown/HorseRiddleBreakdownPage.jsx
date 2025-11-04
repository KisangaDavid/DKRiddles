import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import TopBar from "../common/TopBar.jsx";
import RacesBreakdown from "/src/assets/racesBreakdown.jpg";
import HorseBreakdownCompleteGraph from "/src/assets/horseBreakdownCompleteGraph.png";
import HorseBreakdown2ndPlaceGraph from "/src/assets/horseBreakdown2ndPlaceGraph.png";
import HorseBreakdown3rdPlaceGraph from "/src/assets/horseBreakdown3rdPlaceGraph.png";
import HorseBreakdown4thPlaceGraph from "/src/assets/horseBreakdown4thPlaceGraph.png";
import HorseBreakdown5thPlaceGraph from "/src/assets/horseBreakdown5thPlaceGraph.png";
import RiddleNotComplete from "./RiddleNotComplete.jsx";
import { breakdownCardStyle, breakdownCardContentStyle } from "../common/styles.jsx";
import { SolvedPuzzlesContext, HORSE_PUZZLE } from "../common/utils.js";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PageWrapper from "../common/PageWrapper.jsx";

function HorseRiddleBreakdownPage() {
  const theme = useTheme();
  const { solvedPuzzles, _ } = useContext(SolvedPuzzlesContext);

  return (
    <PageWrapper>
      <TopBar
        text="Puzzle Breakdown #2: The Horse Trifecta"
        isPuzzlePage={false}
        resetFunc={null}
      />
      {solvedPuzzles.has(HORSE_PUZZLE) ? (
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
              mb: "25vh",
              mt: "2vh",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" sx={{ mb: "2vh" }}>
              Intuition
            </Typography>
            <Typography align="left">
              The solution to this puzzle is remeniscent of a multi-way merge
              sort. To start, 5 ordered lists of horses are attained by
              conducting 5 races in which every horse is raced exactly once. A
              6th race is conducted with the winners of the previous 5 races.
              The winner of this race is guaranteed to be the fastest
              horse. A 7th race is conducted, replacing the winner of the 6th
              race with the horse that came directly behind it in one of the
              first 5 races. The winner of this race is guaranteed to be the
              second fastest horse. An 8th race is constructed in the
              same fashion - the winner of the 7th race is replaced with the
              horse that came directly behind it in one of the first 5 races.
              The winner of this race is guaranteed to be the third
              fastest horse. Thus, we have found the fastest 3 horses in only 8
              races!
              <br /> <br />
              But wait, we can optimize this solution and do slightly better!
              First, let's define group 1 as the 5 horses the winner of race 6
              was initially grouped with, group 2 as the 5 horses the runner-up
              of race 6 was initially grouped with, and so on. Notice that ALL
              horses from groups 4 and 5 already have at least 3 horses that are
              faster than them. Therefore, we should exclude them from any
              future races, as these horses cannot be the 2nd or 3rd
              fastest. In fact, after the 6th race, there are only a couple
              horses that have the potential to be the 2nd or 3rd fastest:
              <List
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  listStyleType: "disc",
                }}
              >
                <ListItem sx={{ display: "list-item", width: "90%" }}>
                  <b>
                    If all three fastest horses were placed into the same
                    initial group:
                  </b>
                  <br />
                  The 2nd and 3rd fastest horses must be the 2nd and 3rd place
                  finishers of group 1.
                </ListItem>
                <ListItem sx={{ display: "list-item", width: "90%" }}>
                  <b>
                    If the two fastest horses were placed into the same initial
                    group:
                  </b>
                  <br />
                  The 2nd and 3rd fastest horses must be the 2nd place finisher
                  of group 1 and the 1st place finisher of group 2.
                </ListItem>
                <ListItem sx={{ display: "list-item", width: "90%" }}>
                  <b>
                    If the second and third fastest horses were placed into the
                    same initial group:
                  </b>
                  <br />
                  The 2nd and 3rd fastest horses must be the 1st and 2nd place
                  finishers of group 2.
                </ListItem>
                <ListItem sx={{ display: "list-item", width: "90%" }}>
                  <b>
                    If the fastest and third fastest horses were placed into the
                    same initial group:
                  </b>{" "}
                  <br />
                  The 2nd and 3rd fastest horses must be the first place
                  finisher of group 2 and the 2nd place finisher of group 1.
                </ListItem>
                <ListItem sx={{ display: "list-item", width: "90%" }}>
                  <b>
                    If none of the fastest three horses were placed into the
                    same initial group:
                  </b>{" "}
                  <br />
                  The 2nd and 3rd fastest horses must be the winners of groups 2
                  and 3.
                </ListItem>
              </List>
              Notice that there are only 5 distinct horses vying for the
              remaining two spots in the trifecta - the 2nd and 3rd place
              finishers from group 1, the 1st and 2nd place finishers from group
              2, and the 1st place finisher from group 3. Thus, for our 7th
              race, we can simply race these 5 horses and declare the fastest
              two the second and third fastest horses! We've now found
              the fastest 3 horses in just 7 races, the optimal solution! 
            </Typography>
            <br />
            <Card sx={[breakdownCardStyle, {width: "75%"}]}>
              <CardMedia
                component="img"
                image={RacesBreakdown}
                sx={{
                  width: "100%",
                  objectFit: "contain",
                }}
              />
              <CardContent sx={breakdownCardContentStyle}>
                <Typography align="center">
                  An example of the optimal racing strategy. In this
                  arrangement, the fastest 3 horses are horses 21, 25, and 16.
                </Typography>
              </CardContent>
            </Card>
            <br /> <br /> <br />
            <Typography align="center" variant="h4" sx={{ mb: "2vh" }}>
              Implementation
            </Typography>
            <Typography align="left">
              The crux of implementing this puzzle is to, given a series of
              races, determine if the submitted horses <b>must</b> be the
              fastest 3. We can verify the above by constructing a simple graph.
              We start by creating 25 nodes, one for each horse. For each horse
              in each race, we draw an edge to the horse it finished directly in
              front of. Now, if there is exactly one source (a node with no
              incoming edges) in the resulting graph, then the horse
              corresponding to that node must be the fastest horse included in
              the graph.
            </Typography>
            <br />
            <Card sx={[breakdownCardStyle, {width: "50%"}]}>
              <CardMedia
                component="img"
                image={HorseBreakdownCompleteGraph}
                sx={{
                  width: "100%",
                  objectFit: "contain",
                }}
              />
              <CardContent sx={breakdownCardContentStyle}>
                <Typography align="center">
                  The graph built for the example series of races given above.
                  Since node 21 is the only source, horse 21 must be the fastest
                  horse.
                </Typography>
              </CardContent>
            </Card>
            <br /> <br />
            <Typography align="left">  
              To check that the submitted 2nd fastest horse must indeed be the
              2nd fastest horse, simply remove the fastest horse from the graph
              and again check if there is only one source. This process can be
              repeated any number of times. 
            </Typography>
            <br />
            <Stack direction="row" gap="0.5vw">
              <Card sx={[breakdownCardStyle, {width: "100%"}]}>
                <CardMedia
                  component="img"
                  image={HorseBreakdown2ndPlaceGraph}
                  sx={{
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
                <CardContent sx={breakdownCardContentStyle}>
                  <Typography align="center">
                    After removing horse 21 from the graph, horse 25 becomes the
                    only source node.
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={[breakdownCardStyle, {width: "100%"}]}>
                <CardMedia
                  component="img"
                  image={HorseBreakdown3rdPlaceGraph}
                  sx={{
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
                <CardContent sx={breakdownCardContentStyle}>
                  <Typography align="center">
                    After removing horse 25 from the graph, horse 16 becomes the
                    only source node.
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={[breakdownCardStyle, {width: "100%"}]}>
                <CardMedia
                  component="img"
                  image={HorseBreakdown4thPlaceGraph}
                  sx={{
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
                <CardContent sx={breakdownCardContentStyle}>
                  <Typography align="center">
                    After removing horse 25 from the graph, horse 16 becomes the
                    only source node.
                  </Typography>
                </CardContent>
              </Card>
            </Stack>
             <br /> <br />
            <Typography align="left">
              Note that, in this specific example, we actually get to know the
              fastest 4 horses after just 7 races! This is not always the case -
              this specific configuration was just lucky. If there are multiple
              source horses, it means that the speed relation between said
              horses is ambiguous. An exmaple is shown below:
            </Typography>
            <br />
            <Card sx={[breakdownCardStyle, {width: "50%"}]}>
              <CardMedia
                component="img"
                image={HorseBreakdown5thPlaceGraph}
                sx={{
                  width: "100%",
                  objectFit: "contain",
                }}
              />
              <CardContent sx={breakdownCardContentStyle}>
                <Typography align="center" justifyContent={"center"}>
                  After removing horse 18 from the graph, there are now two
                  source nodes. Thus, it is unknown which horse is the 5th
                  fastest!
                </Typography>
              </CardContent>
            </Card>
            <br /> <br />
            <Typography sx={{ width: "100%" }} align="left">
              If such a situation happens while determining the 1st, 2nd, or 3rd
              fastest horse, then the submitted trifecta / series of races is
              invalid!
            </Typography>
          </Box>
        </Fade>
      ) : (
        <RiddleNotComplete
          puzzleNumber={2}
          puzzleTitle={"The Horse Trifecta"}
        />
      )}
    </PageWrapper>
  );
}

export default HorseRiddleBreakdownPage;
