import { useTheme } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import { standardTextFade } from '../_common/utils';

interface props {
  roosterMove: [number, number[]];
}
function RoosterMoveDesription({ roosterMove } : props) {
  const theme = useTheme();

  return (
    <Fade in={true} mountOnEnter unmountOnExit timeout={standardTextFade}>
      <Box sx={{width: "100%", position: "relative", mb:"2vh"}}>
        {roosterMove[0] == -1
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
