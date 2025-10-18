import { styled, useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router";

import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

function PuzzleCard({puzzleImage, puzzleNumber, puzzleName, puzzleDescription, puzzlePath, transitionDelay}) {
  const theme = useTheme();
  const navigate = useNavigate();

  const StyledCard = styled(Card)(({}) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    height: '100%',
    boxShadow: 'hsla(223, 41%, 3%, 0.70) 0px 0px 20px 0px, hsla(220, 29%, 8%, 0.80) 0px 0px 20px 0px',
    '&:hover': {
      backgroundColor: 'transparent',
      boxShadow: 'hsla(0, 0%, 36%, 0.70) 0px 0px 16px 0px, hsla(240, 1%, 40%, 0.80) 0px 0px 16px 0px',
      cursor: 'pointer',
    },
    '&:focus-visible': {
      outline: '3px solid',
      outlineColor: 'hsla(210, 98%, 48%, 0.5)',
      outlineOffset: '2px',
    },
  }));

  const StyledCardContent = styled(CardContent)({
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    padding: 16,
    paddingTop: 32,
    flexGrow: 1,
    backgroundImage:
				"radial-gradient(ellipse 55% 55% at 50% -5%, hsl(210, 100%, 16%), hsla(208, 100.00%, 3.70%, 0.64))",
    height: "100%",
    '&:last-child': {
        paddingBottom: 16,
    },
  });

  const StyledTypography = styled(Typography)({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  });

  return (
    <Fade in={true} mountOnEnter unmountOnExit timeout={theme.transitions.duration.standardImageFade} 
      style={{transitionDelay: transitionDelay}}>
    <StyledCard variant="outlined" onClick={() => navigate(puzzlePath)}> 
      <CardMedia
          component="img"
          image={puzzleImage}
          sx={{
              borderBottom: '1px solid',
              borderColor: 'divider',
              height: "100%",
              backgroundImage: "radial-gradient(ellipse 55% 55% at 50% 50%, hsla(210, 68%, 11%, 1.00), hsla(208, 100.00%, 3.70%, 0.64))"
          }}
      />
      <StyledCardContent>
        <Typography gutterBottom variant="caption" component="div">
          Envelope #{puzzleNumber}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {puzzleName}
        </Typography>
        <StyledTypography variant="body2" color="text.secondary" gutterBottom>
          {puzzleDescription}
        </StyledTypography>
      </StyledCardContent>
    </StyledCard>
    </Fade>
  );
}

export default PuzzleCard;