import { Typography } from "@mui/material";
import Grid from '@mui/material/Grid'

interface Props {
    rank: number; 
    username: string;
    numPuzzlesSolved: string;
}

function SolvedPuzzleRow({ rank, username, numPuzzlesSolved }: Props) {

  return (
    <Grid container size={12} alignItems="center" sx={{my: "0.5em"}}>
    <Grid size={4}>
        <Typography variant="body2">{rank}</Typography>
      </Grid>
      <Grid size={4}>
        <Typography variant="body2">{username}</Typography>
      </Grid>
      <Grid size={4}>
        <Typography variant="body2">{numPuzzlesSolved}</Typography>
      </Grid>
    </Grid>
  );
}

export default SolvedPuzzleRow;