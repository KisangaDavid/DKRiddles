import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import { standardTextFade } from "../_common/utils";

function RabbitRiddleDescription() {
  return (
    <Fade in={true} mountOnEnter unmountOnExit timeout={standardTextFade}>
      <Box sx={{ width: 'var(--pageWidthPercent)', position: "relative", mb: "3em" }}>
        <p>
          You open the fourth envelope. Inside you find an unusually curt note, which reads:
          <br />
          <i>
            Reorganize my rabbits. The black ones must be on the left, and the white ones on the right. 
            The rules governing how my rabbits move are trivial - figure them out yourself.</i>
          <br />
          <br />
          Before you are able to process the strange tone of this note, six rabbits hop over and arrange themselves in a row in front of you:
        </p>
      </Box>
    </Fade>
  );
}

export default RabbitRiddleDescription;
