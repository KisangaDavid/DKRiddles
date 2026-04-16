"use client"

import { Divider, Grid, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Card } from "@mui/material";
import { AuthActions } from "../auth/utils";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { SolvedPuzzlesContext } from "../_common/SolvedPuzzlesContextProvider";
import { fetcher } from "../_common/utils";
import useSWR from "swr";
import SubmitButton from "../_common/SubmitButton";
import SolvedPuzzleRow from "./SolvedPuzzleRow";
import { ALL_PUZZLE_TITLES, ALL_PUZZLES } from "../_common/constants";

const { logout, removeTokens } = AuthActions();
const StyledCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  background: 'hsla(220, 35%, 3%, 0.4)',
  border: `1px solid hsla(0, 0%, 23%, 0.60)`,
  boxShadow: 'hsla(223, 41%, 3%, 0.70) 0px 0px 20px 0px, hsla(220, 29%, 8%, 0.80) 0px 0px 20px 0px',
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
});

function ProfileCard() {
    const router = useRouter();
    const { clearSolvedPuzzles } = useContext(SolvedPuzzlesContext)
    const { data: { username, dateJoined, solvedPuzzles } = {}, isLoading } = useSWR(
        "/getProfileInfo",
        fetcher,
        {keepPreviousData: true}
    );

    const dateJoinedStr = dateJoined
      ? new Date(dateJoined).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "";

  const numPuzzlesSolved = Object.keys(solvedPuzzles || {}).length;
  const numSolvedEmoji =
    numPuzzlesSolved === 0 ? "💩":
    numPuzzlesSolved === 1 ? "😬" :
    numPuzzlesSolved === 2 ? "😒" :
    numPuzzlesSolved === 3 ? "😐" :
    numPuzzlesSolved === 4 ? "😤" :
    numPuzzlesSolved === 5 ? "🔥" :
    numPuzzlesSolved === 6 ? "👑" :
    "👺";

    const handleLogout = () => {
      logout()
        .res(() => {
          removeTokens();
          clearSolvedPuzzles();
          router.push("/auth/login");
        })
        .catch(() => {
          removeTokens();
          clearSolvedPuzzles();
          router.push("/auth/login");
        });
    };

    return (
      <StyledCard sx={{ display: "flex", alignItems: "center", width: {xs: "85%", sm: "70%", md: "55%", lg: "45%" }, mt: {xs: "2em", md: "4em"}}}>
        <Typography align="left" variant="h5" sx={{mt:"0.5em"}}>{username} {numSolvedEmoji}</Typography>
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
          {!isLoading && ALL_PUZZLE_TITLES.map((puzzleName, idx) => (
            <SolvedPuzzleRow key={idx} puzzleName={puzzleName} dateSolved={solvedPuzzles[(ALL_PUZZLES[idx])]}/> 
          ))}
          </Grid>
        <SubmitButton sx={{width: {xs: "40%", md: "25%"}, mt: "1em", mb: "2em"}}
          onClick={handleLogout}
        >
          <Typography>Log Out</Typography>
        </SubmitButton>
      </StyledCard>
    );
};

export default ProfileCard;