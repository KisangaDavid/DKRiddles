'use client';

import { useState, useEffect } from 'react'
import { useTheme } from '@mui/material/styles';

import Image from 'next/image.js';
import Chip from '@mui/material/Chip';
import ratRiddleThumbnail from '../assets/ratRiddleThumbnail.png'
import horseRiddleThumbnail from '../assets/horseTrifecta.png'
import roosterRiddleThumbnail from '../assets/roosterRiddleThumbnail.png'
import mysteryLetter from '../assets/mysteryLetter.jpg'
import PuzzleCard from './_common/PuzzleCard'
import riddleManLetter from '../assets/riddleManLetter.jpg'
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import TopBar from './_common/TopBar';
import { standardTextFade, standardImageFade, longTextFade, longDelay } from './_common/utils';

function IntroductionPage() {

  const shortDelay = 200;
  const theme = useTheme();
  const [activatedChip, setActivatedChip] = useState(-1);
  const [shouldPreloadImgs, setShouldPreloadImgs] = useState(false)

  useEffect(() => setShouldPreloadImgs(true), []);
  
  return (
    <>
      <TopBar text="Introduction" isPuzzlePage={false} resetFunc={undefined} />
      <Fade in={true} timeout={1000}>
        <Box sx={{width: 'var(--pageWidthPercent)', position: "relative", mb:"1vh"}}>
          <p>
            Mr. Riddle Man - a name shrouded in mystery. Renowned by many to be the world's
            foremost puzzle expert, he is often called upon to solve the world's toughest
            conundrums - and none have stumped him yet. Despite his world-famous status,
            no one knows his true identity. That's all you know about the man - at least
            all you <i>did</i> know, until a ... <i>puzzling</i> set of envelopes arrived
            at your doorstep this morning. You notice a letter lying atop the envelopes.
          </p>
        </Box>
      </Fade>
      <br />
      <Fade in={true} timeout={standardTextFade}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: "row",
            width: 'var(--pageWidthPercent)',
            alignItems: "start",
            gap: 1,
            overflow: 'clip',
            mb: "4vh", 
            marginLeft: "0 auto",
          }}
        >
          <Chip 
            size="medium" 
            onClick={() => setActivatedChip(0)} 
            label= "Letter"
            sx={{
              fontWeight: 600,
              backgroundColor: activatedChip == 0 ? 'hsla(222, 21.30%, 12.00%, 0.51)' : 'hsla(208, 100.00%, 3.70%, 0.64)',
              border: activatedChip === 0 ? 1 : 'none'
            }} 
          />
          <Chip onClick={() => setActivatedChip(1)}
            size="medium"
            label="All Envelopes"
            sx={{
              fontWeight: 600,
              backgroundColor: activatedChip == 1 ? 'hsla(222, 21.30%, 12.00%, 0.51)' : 'hsla(208, 100.00%, 3.70%, 0.64)',
              border: activatedChip === 1 ? 1 : 'none'
            }}
          />
        </Box>
      </Fade>
      {activatedChip == 0 &&
        <Grid 
          container 
          spacing={4} 
          columns={12} 
          direction = "row" 
          sx={{
            display: "flex",
            width: 'var(--pageWidthPercent)'
          }}
        >
          <Grid size={{ sm: 12, md: 6}}>
            <Fade in={true} timeout={standardImageFade}>
              <Box>
              <Image 
                src={riddleManLetter} 
                alt="letter"
                style={{
                  objectFit: "contain", 
                  height: "auto", 
                  width: "100%", 
                  borderRadius: theme.shape.borderRadius,
                  border: `1px solid hsla(0, 0%, 23%, 0.60)`,
                }}
              />
              </Box>
            </Fade>
          </Grid>
          <Grid size={{ sm: 12, md: 6}} style={{display: "flex", justifyContent: 'center', alignItems: "center"}}>   
            <Fade 
              in={true}  
              style = {{transitionDelay: longDelay + "ms"}} 
              timeout={longTextFade}
            >     
              <p style={{ textAlign: "left" }}>      
                The letter reads: <br /> <br />
                <i>
                  I am Mr. Riddle Man. I grow weary of my power and status, and so wish to
                  pass the title of Mr. Riddle Man to another. Attached to this letter you
                  shall find a set of envelopes. Each envelope contains a puzzle - solve them
                  all in their entirety, and I shall name you as my successor. Should you
                  choose to accept, I advise secrecy of the highest order - the identity of a
                  Riddle Man must always be hidden, as there are those in this world who stand
                  much to gain from our demise. Prove your commitment to the cause by solving
                  my riddles, and in time I will reveal to you the secrets of the Riddle Men,
                  as well as my true identity.
                  <br /> <br />
                  I will be watching, <br />
                  Mr. Riddle Man
                </i>
              </p>
            </Fade>
          </Grid>
        </Grid>
      }
      {activatedChip == 1 &&
        <Grid container spacing={2} columns={12} direction = "row" sx={{width: 'var(--pageWidthPercent)'}}>
          <Grid size={{ sm: 6, lg: 3 }}>
            <PuzzleCard 
              puzzleImage = {ratRiddleThumbnail} 
              puzzleName = "The Sneaky Rat" 
              puzzleNumber = {1} 
              puzzleDescription = "Concoct the perfect plan to catch a sneaky rat!"
              puzzlePath = "/ratRiddle" 
              transitionDelay={0}
            />
          </Grid>
          <Grid size={{ sm: 6, lg: 3 }}>
            <PuzzleCard 
              puzzleImage = {horseRiddleThumbnail} 
              puzzleName = "The Horse Trifecta" 
              puzzleNumber = {2}
              puzzleDescription = "Utilize your skills of deduction to win big at the horse races!"
              puzzlePath = "/horseRiddle" 
              transitionDelay={shortDelay}
            />
          </Grid>
          <Grid size={{ sm: 6, lg: 3 }}>
            <PuzzleCard 
              puzzleImage = {roosterRiddleThumbnail} 
              puzzleName = "The Undefeated Rooster" 
              puzzleNumber = {3}
              puzzleDescription = "Best the undefeated rooster in a battle of intellect!"
              puzzlePath = "/roosterRiddle" 
              transitionDelay={shortDelay * 2}
            />
          </Grid>
          <Grid size={{ sm: 6, lg: 3 }}>
            <PuzzleCard 
              puzzleImage = {mysteryLetter} 
              puzzleName = "Jumping Rabbits" 
              puzzleNumber = {4}
              puzzleDescription = "Reorganize the Riddleman's rabbits!"
              puzzlePath = "/rabbitRiddle" 
              transitionDelay={shortDelay * 3}
            />
          </Grid>
        </Grid>
      }
      {shouldPreloadImgs && 
        <Box sx={{display: "none"}}>
          hello
          <Image
            src={ratRiddleThumbnail}
            alt=""
            width={1}
            height={1}
            loading="eager"
          />
          <Image
            src={horseRiddleThumbnail}
            alt=""
            width={1}
            height={1}
            loading="eager"
          />
          <Image
            src={riddleManLetter}
            alt=""
            width={1}
            height={1}
            loading="eager"
          />
          <Image
            src={roosterRiddleThumbnail}
            alt=""
            width={1}
            height={1}
            loading="eager"
          />
          <Image
            src={mysteryLetter}
            alt=""
            width={1}
            height={1}
            loading="eager"
          />
        </Box>
      }
    </>
  );
}

export default IntroductionPage;

