import { useTheme } from '@mui/material/styles';

import Link from 'next/link.js';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import { puzzleCardStyle, puzzleCardContentStyle } from "./styles.jsx"

function PuzzleCard({puzzleImage, puzzleNumber, puzzleName, puzzleDescription, puzzlePath, transitionDelay}) {
  const theme = useTheme();

  return (
    <Fade in={true} timeout={theme.transitions.duration.standardImageFade} 
      style={{transitionDelay: transitionDelay}}>
    <Link href={puzzlePath}>
      <Card sx={puzzleCardStyle}> 
        <CardMedia
            component="img"
            image={puzzleImage.src}
            sx={{
                borderBottom: '1px solid',
                borderColor: 'divider',
                height: "100%",
                backgroundImage: 
                  "radial-gradient(ellipse 55% 55% at 50% 50%, hsla(210, 68%, 11%, 1.00), hsla(208, 100.00%, 3.70%, 0.64))"
            }}
        />
        <CardContent sx={puzzleCardContentStyle}>
          <Typography gutterBottom variant="caption" component="div">
            Envelope #{puzzleNumber}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {puzzleName}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {puzzleDescription}
          </Typography>
        </CardContent>
      </Card>
    </Link>
    </Fade>
  );
}

export default PuzzleCard;