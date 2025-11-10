import { styled } from '@mui/material/styles';
import { Card, CardContent } from '@mui/material';

export const StyledBreakdownCard = styled(Card)({
  padding: 0,
  gap: 0,
  backgroundColor: 'hsl(220, 20%, 88%)',
  border: `1px solid hsla(0, 0%, 61%, 0.70)`,
  boxShadow: 10
});

export const StyledBreakdownCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  padding: "8px",
  paddingTop: "8px",
  flexGrow: 1,
  backgroundImage: 
    "radial-gradient(ellipse 55% 55% at 50% -5%, hsl(210, 100%, 16%), hsla(208, 100.00%, 3.70%, 0.64))",
  height: "100%",
  "&:last-child": {
    paddingBottom: "8px",
  },
});