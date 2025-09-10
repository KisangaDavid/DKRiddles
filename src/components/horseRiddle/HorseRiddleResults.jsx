const MIN_NUM_RACES = 7;

function HorseRiddleResults({numRaces, setConfetti}) {
  if (numRaces == MIN_NUM_RACES) {
    setConfetti(true);
  }
  return (
    <>
      {numRaces == MIN_NUM_RACES ?
        <p>
          After {numRaces} races, you correctly deduce the fastest three horses!
          You tiptoe back out of the racetrack, successfully sneaking by the
          snoring guard you put to sleep earlier. <br /> <br />
          The next day you return to the racetrack, place a trifecta bet using
          your knowledge from the night before ... and win a massive million
          dollar payout! As you make your way through the crowds to claim your
          winnings, a folded note is surreptitiously pressed into your hand. The
          note reads: <br /> <br />
          <i>
            <b>
              You have successfully completed envelope #2, and are one step
              closer to becoming my chosen successor, the new Mr. Riddle Man.
              Take pride in your success!
            </b>
          </i>
        </p>
      : 
        <p>
          After {numRaces} races, you correctly deduce the fastest three horses.
          However, you've taken too much time - as you are sneaking out of
          the racetrack, you are caught by a slightly drowsy but very much awake
          security guard! You are beaten mercilessly and sentenced to 6 months in jail.<br /> <br />
          <b>Reset the puzzle to try again!</b>
        </p>
    }
    </>
  );
}

export default HorseRiddleResults;
