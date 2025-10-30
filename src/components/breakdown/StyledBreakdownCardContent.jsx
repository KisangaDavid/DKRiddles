import { styled } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";

const StyledBreakdownCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  padding: 8,
  paddingTop: 8,
  flexGrow: 1,
  backgroundImage: 
    "radial-gradient(ellipse 55% 55% at 50% -5%, hsl(210, 100%, 16%), hsla(208, 100.00%, 3.70%, 0.64))",
  height: "100%",
  "&:last-child": {
    paddingBottom: 8,
  },
});

export default StyledBreakdownCardContent;