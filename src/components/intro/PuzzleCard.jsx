import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router";

import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

function PuzzleCard({puzzleImage, puzzleNumber, puzzleName, puzzleDescription, puzzlePath, transitionDelay}) {
  const navigate = useNavigate();

  const SyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    height: '100%',
    backgroundColor: (theme.vars || theme).palette.background.paper,
    '&:hover': {
      backgroundColor: 'transparent',
      cursor: 'pointer',
    },
    '&:focus-visible': {
      outline: '3px solid',
      outlineColor: 'hsla(210, 98%, 48%, 0.5)',
      outlineOffset: '2px',
    },
  }));

  const SyledCardContent = styled(CardContent)({
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    padding: 16,
    flexGrow: 1,
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
    <Fade in={true} mountOnEnter unmountOnExit timeout={1000} 
      style={{transitionDelay: transitionDelay}}>
    <SyledCard variant="outlined" onClick={() => navigate(puzzlePath)}> 
      <CardMedia
          component="img"
          image={puzzleImage}
          sx={{
              borderBottom: '1px solid',
              borderColor: 'divider',
              height: "100%"
          }}
      />
      <SyledCardContent>
        <Typography gutterBottom variant="caption" component="div">
          Envelope #{puzzleNumber}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {puzzleName}
        </Typography>
        <StyledTypography variant="body2" color="text.secondary" gutterBottom>
          {puzzleDescription}
        </StyledTypography>
      </SyledCardContent>
    </SyledCard>
    </Fade>
  );
}

export default PuzzleCard;