import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { ChangeEvent } from "react";

interface props {
  handleTrifectaChange: (event: ChangeEvent, num: number) => void
}
const TrifectaStack = ({handleTrifectaChange} : props) => (
  <Stack
    direction="row"
    justifyContent="center"
    divider={<Divider orientation="vertical" flexItem />}
    spacing={2}
    sx={{ mb: "2vh" }}
  >
    <TextField
      id="fastestHorse"
      variant="outlined"
      size="small"
      autoComplete="off"
      label="1st Place"
      onChange={(e) => handleTrifectaChange(e, 0)}
    />
    <TextField
      id="secondFastestHorse"
      variant="outlined"
      size="small"
      autoComplete="off"
      label="2nd Place"
      onChange={(e) => handleTrifectaChange(e, 1)}
    />
    <TextField
      id="thirdFastestHorse"
      variant="outlined"
      size="small"
      autoComplete="off"
      label="3rd Place"
      onChange={(e) => handleTrifectaChange(e, 2)}
    />
  </Stack>
);

export default TrifectaStack;