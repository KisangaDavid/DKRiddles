import { useTheme } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";

function RoosterMoveDesription({ roosterMove }) {
  const theme = useTheme();

  return (
    <Fade in={true} mountOnEnter unmountOnExit timeout={theme.transitions.duration.standardTextFade}>
      <Box sx={{width: "75vw", position: "relative", mb:"3vh"}}>
        {roosterMove[0] == null 
          ? 
            <p>
              The rooster shoots you a cocky look, daring you to make the first move.
            </p> 
          :
            <p>
              The rooster clucks and takes {roosterMove[1].length} {roosterMove[1].length > 1 ? "kernels" : "kernel"} from pile {roosterMove[0] + 1}
            </p>}
      
      </Box>
    </Fade>
  );
}

export default RoosterMoveDesription
