"use client"

import { Button, Divider, Grid, Link, Typography } from "@mui/material";
import { AuthActions } from "../auth/utils";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { SolvedPuzzlesContext } from "../_common/SolvedPuzzlesContextProvider";
import { getNumPuzzlesSolvedEmoji } from "../_common/utils";
import { fetcher } from "../_common/ClientUtils";
import useSWR from "swr";
import SolvedPuzzleRow from "./SolvedPuzzleRow";
import { ALL_PUZZLE_TITLES, ALL_PUZZLES, CHOOSE_USERNAME_SLUG, LOGIN_SLUG, PENDING_USERNAME, SS_PFP_URL } from "../_common/constants";
import Image from 'next/image'
import StyledCard from "../_common/StyledCard";

const { removeTokens } = AuthActions();

function ProfileCard() {
    const router = useRouter();
    const { clearSolvedPuzzles, resetSolvedPuzzles } = useContext(SolvedPuzzlesContext)

    const { data: { username = "", dateJoined = " ", userPfpLink = "", solvedPuzzles  } = {}, isLoading } = useSWR(
        "getProfileInfo",
        fetcher,
        {keepPreviousData: true}
    );

    useEffect(() => {
      if (solvedPuzzles) {
        resetSolvedPuzzles(solvedPuzzles);
      }
  }, [solvedPuzzles]);

    const dateJoinedStr = dateJoined
      ? new Date(dateJoined).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "";

  const numPuzzlesSolved = solvedPuzzles
    ? Object.keys(solvedPuzzles).length
    : -1;
    
  const numSolvedEmoji = getNumPuzzlesSolvedEmoji(numPuzzlesSolved);

    const handleLogout = () => {
      removeTokens();
      sessionStorage.removeItem(SS_PFP_URL)
      router.push(LOGIN_SLUG)
    };
    return (
      <StyledCard sx={{ display: "flex", position: "relative", alignItems: "center", width: {xs: "85%", sm: "70%", md: "55%", lg: "45%" }, mt: {xs: "2em", md: "4em"}}}>
          {username.startsWith(PENDING_USERNAME) ? <Link align="center" variant="h5" sx={{mt:"0.5em", mx: "1em"}} href={CHOOSE_USERNAME_SLUG} >
           User registration is incomplete. Please click here to select a username.</Link>
           : <Typography align="left" variant="h5" sx={{mt:"0.5em"}}>
           {username} {numSolvedEmoji}</Typography>}
        <Typography variant="h6" sx={{mt:"0.5em"}}>Date Joined: {dateJoinedStr}</Typography>
        <Divider sx={{width: "80%", my: "0.5em"}} />
        <Typography sx={{mb: "1em"}}>{Object.keys(solvedPuzzles || {}).length} / {ALL_PUZZLES.length} Puzzles solved</Typography>
          <Grid container size={12} sx={{mb: "0.5em", width: "95%"}}>
            <Grid size={6} sx={{mb: "1em"}}>
              <Typography variant="h6" fontWeight="bold">Puzzle Name</Typography>
            </Grid>
            <Grid size={6} sx={{mb: "1em"}}>
              <Typography variant="h6" fontWeight="bold">Solve Date</Typography>
            </Grid>
          {ALL_PUZZLE_TITLES.map((puzzleName, idx) => (
            <SolvedPuzzleRow key={idx} puzzleName={puzzleName} dateSolved={!isLoading ? solvedPuzzles[(ALL_PUZZLES[idx])] : ""}/> 
          ))}
          </Grid>
            <Button
              onClick={handleLogout}
              sx={{
                paddingLeft: "1.75rem",
                paddingRight: "1.75rem",
                mb: "2em",
                lineHeight: "1",
                color: "white",
                textTransform: "none",
                transition: "background-color 200ms, color 200ms",
                backgroundColor: "rgba(204, 48, 48, 0.85)", // soft red
                borderRadius: "0.375rem",
                border: "none",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(163, 24, 24, 0.95)", // slightly stronger red
                },
              }}
            >
              <Typography>Log Out</Typography>
            </Button>
      </StyledCard>
    );
};

export default ProfileCard;