import { Typography } from "@mui/material";
import Grid from '@mui/material/Grid'

interface Props {
  puzzleName: string;
  dateSolved: string;
}

function SolvedPuzzleRow({ puzzleName, dateSolved }: Props) {
  const stringDateSolved = dateSolved
    ? new Date(dateSolved).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Not Solved";

  return (
    <Grid container size={12} alignItems="center" sx={{my: "0.5em"}}>
      <Grid size={6}>
        <Typography variant="body2">{puzzleName}</Typography>
      </Grid>
      <Grid size={6}>
        <Typography variant="body2">{stringDateSolved}</Typography>
      </Grid>
    </Grid>
  );
}

export default SolvedPuzzleRow;