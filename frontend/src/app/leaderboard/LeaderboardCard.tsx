"use client"

import { Divider, Fade, Grid, Typography } from "@mui/material";
import { fetcher } from "../_common/ClientUtils";
import useSWR from "swr";
import StyledCard from "../_common/StyledCard";
import LeaderboardRow from "./LeaderboardRow";
import { standardTextFade } from "../_common/constants";

function LeaderboardCard() {
    const { data, isLoading } = useSWR(
        "/getLeaderboardInfo",
        fetcher,
        {keepPreviousData: true}
    );

    return (
      <Fade unmountOnExit mountOnEnter in={true} timeout={standardTextFade}>
        <StyledCard sx={{ display: "flex", alignItems: "center", width: {xs: "85%", sm: "70%", md: "55%", lg: "45%" }, mt: {xs: "2em", md: "4em"}}}>
          <Typography align="left" variant="h5" sx={{mt:"0.5em"}}>Leaderboard</Typography>
          <Divider sx={{width: "80%", my: "0.5em"}} />
            <Grid container size={12} sx={{mb: "0.5em", width: "95%"}}>
              <Grid size={4} sx={{mb: "0.5em"}}>
                <Typography variant="h6" fontWeight="bold">Rank</Typography>
              </Grid>
              <Grid size={4} sx={{mb: "0.5em"}}>
                <Typography variant="h6" fontWeight="bold">Username</Typography>
              </Grid>
              <Grid size={4} sx={{mb: "0.5em"}}>
                <Typography variant="h6" fontWeight="bold">Puzzles Solved</Typography>
              </Grid>
            {Array.from({ length: 10 }, (_, i) => data ? data[i] : null).map((user, idx) => (
              <LeaderboardRow key={idx} rank={idx + 1} username={user ? user["username"] : ""} numPuzzlesSolved={user ? user["numPuzzlesSolved"] : ""}/> 
            ))}
            </Grid>
        </StyledCard>
      </Fade>
    );
};

export default LeaderboardCard;