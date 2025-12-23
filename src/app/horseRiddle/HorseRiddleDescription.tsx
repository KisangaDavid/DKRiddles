import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import { standardTextFade } from '../_common/utils';

function HorseRiddleDescription() {
  return (
    <Fade in={true} mountOnEnter unmountOnExit timeout={standardTextFade}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 'var(--pageWidthPercent)',
          position: "relative",
          mb: "2vh",
        }}
      >
        <p>
          You tear open the second envelop and find a small purple flask,
          alongside a note. The note reads:
          <br />
          <i>
            A Riddle Man must be bold and resourceful. Prove you are both by
            attaining $1 million dollars by sundown tomorrow. You may use the
            included potion of somnolence to aide you in this task.
          </i>{" "}
          <br /> <br />
          After quickly Googling somnolence, you come up with a brilliant plan:
          first, you'll sneak into the local racetrack with the help of the
          Riddleman's sleeping potion. Once inside, you'll race all the horses to 
          determine the fastest three. The next day you'll place a winning trifecta 
          bet, which if you put your entire life savings into should result in 
          a $1 million dollar payout!
          <br /> <br />
          You successfully sneak into the racetrack, but are horrified to discover that the 
          practice track is only wide enough to race 5 horses at a time! After some thinking, 
          you realize you can still determine the fastest three horses by racing five horses 
          at a time and marking down the order in which they finish. However, each additional race you set
          up increases the risk that the sleeping security guards will wake up.
          How can you determine the fastest three horses in the least amount of
          races?
        </p>
      </Box>
    </Fade>
  );
}

export default HorseRiddleDescription;
