import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";

const TrifectaStack = ({ handleTrifectaChange}) => (
  <Stack
    direction="row"
    justifyContent="center"
    divider={<Divider orientation="vertical" flexItem />}
    spacing={2}
    sx={{ mb: "2vh" }}
  >
    <TextField
      id="fastestHorse"
      variant="standard"
      label="1st Place Horse"
      onChange={(e) => handleTrifectaChange(e, 0)}
    />
    <TextField
      id="secondFastestHorse"
      variant="standard"
      label="2nd Place Horse"
      onChange={(e) => handleTrifectaChange(e, 1)}
    />
    <TextField
      id="thirdFastestHorse"
      variant="standard"
      label="3rd Place Horse"
      onChange={(e) => handleTrifectaChange(e, 2)}
    />
  </Stack>
);

export default TrifectaStack;