import { useTheme } from '@mui/material/styles';

import RootBackground from "../common/RootBackground.jsx";
import Fade from '@mui/material/Fade';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from "@mui/material/Box";
import TopBar from '../common/TopBar.jsx';
import { Typography } from '@mui/material';

function RiddleNotComplete({puzzleNumber, puzzleTitle}) {

  const theme = useTheme();

  return (

      <Fade in={true} mountOnEnter unmountOnExit timeout={theme.transitions.duration.standardTextFade}>      
            <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "50vw",
              position: "relative",
              mb: "8vh",
              mt: "2vh",
              alignItems: "center",
            }}
          >
        <Typography> 
          A Riddle Man does not reveal his secrets to one who has not solved his riddle! Solve puzzle #{puzzleNumber}, <i>{puzzleTitle}</i>, to gain access to this page. </Typography>
          </Box>
      </Fade>
  );
}

export default RiddleNotComplete;
