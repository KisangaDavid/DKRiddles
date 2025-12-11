import { useTheme } from "@mui/material/styles";

import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import { standardTextFade } from "./utils";

interface props {
  puzzleNumber: number;
  puzzleTitle: string;
  blogLink: string;
}
function RiddleNotComplete({ puzzleNumber, puzzleTitle, blogLink } : props) {
  const theme = useTheme();

  return (
    <Fade
      in={true}
      mountOnEnter
      unmountOnExit
      timeout={standardTextFade}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: {xs: "var(--pageWidthPercent)", sm: "65%"},
          position: "relative",
          mb: "8vh",
          mt: "2vh",
          alignItems: "center",
        }}
      >
        <Typography>
          A Riddle Man does not reveal his secrets to one who has not solved his
          riddles! Solve puzzle #{puzzleNumber}, <i>{puzzleTitle}</i>, to gain
          access to this page. If you're truly stumped or think the puzzle is 
          impossible, <a target="_blank" href={blogLink}>check out this blog post!</a>
        </Typography>
      </Box>
    </Fade>
  );
}

export default RiddleNotComplete;
