import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

interface props {
  finishedRaces: [number];
  MAX_NUM_RACES: number;
  RACE_LENGTH: number;
}
const PreviousRaces = ({ finishedRaces, MAX_NUM_RACES, RACE_LENGTH } : props) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      position: "relative",
      mb: "1vh",
    }}
  >
    <Box sx={{ mb: "1vh" }}>Previous Races:</Box>
    <Grid
      container
      spacing={0}
      columns={13}
      direction="row"
      sx={{
        flexGrow: 1,
        display: "flex",
        borderTop: "2px solid",
        borderLeft: "2px solid",
        borderColor: "divider",
        "& > div": {
          borderRight: "2px solid",
          borderBottom: "2px solid",
          borderColor: "divider",
        },
      }}
    >
      <Grid size={3} style={{ overflow: "clip" }}></Grid>
      <Grid size={2} style={{ overflow: "clip" }}>1st</Grid>
      <Grid size={2} style={{ overflow: "clip" }}>2nd</Grid>
      <Grid size={2} style={{ overflow: "clip" }}>3rd</Grid>
      <Grid size={2} style={{ overflow: "clip" }}>4th</Grid>
      <Grid size={2} style={{ overflow: "clip" }}>5th</Grid>
      {[...Array(MAX_NUM_RACES * (RACE_LENGTH + 1))].map((_, idx) => (
        <Grid size={(idx % (RACE_LENGTH + 1) === 0) ? 3 : 2} key={idx} style={{ overflow: "clip" }}>
          {idx % (RACE_LENGTH + 1) === 0
            ? `Race #${1 + idx / (RACE_LENGTH + 1)}`
            : finishedRaces.length > idx - 1 - Math.floor(idx / (RACE_LENGTH + 1))
              ? finishedRaces[idx - 1 - Math.floor(idx / (RACE_LENGTH + 1))] + 1
              : ""}
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default PreviousRaces;