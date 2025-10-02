import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";

const RoosterRiddleDescription = ({ theme }) => (
  // <Fade in={true} mountOnEnter unmountOnExit timeout={theme.transitions.duration.standardTextFade}>
    <Box sx={{width: "75vw", position: "relative", mb:"3vh"}}>
      <p>
        You tear open the third envelope. Inside you find a note, which reads: <br /> <i>This riddle is a challange - you must defeat my prized fighting rooster! Of course, this will be a battle of intelligence, not strength. 
        The rules of battle are simple - You and my rooster will each take turns picking up kernels of corn. On your turn you must take a positive number of kernels
        from a single pile. The one who takes the last kernel wins! I advise you to think through each move thoroughly - my rooster has never yet tasted defeat!</i><br /><br/>
        As soon as you finish reading the note, a magestic rooster struts over and drops a small linnen bag at your feet. The bag, seemingly with a mind of its own, tips over and spills the corn kernels inside into four neat piles. The rooster shoots you a cocky look, imploring you to make the first move:
      </p>
    </Box>
  // </Fade>
);

export default RoosterRiddleDescription;
