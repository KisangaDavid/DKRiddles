import { useState, useEffect } from 'react'
import { useWindowSize } from 'react-use'
import { useTheme } from '@mui/material/styles';
import init from '/src/wasm/horseRiddle.wasm?init'

import Grid from '@mui/material/Grid';
import Confetti from 'react-confetti'
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import horseImg from "/src/assets/horseClipArt.jpg";
import Fade from '@mui/material/Fade';
import RefreshIcon from '@mui/icons-material/Refresh';
import Box from "@mui/material/Box";
import TopBar from '../common/TopBar.jsx';

function HorseGridElement({horseNumber, onClick}) {
    return <Grid size={1}
          display="flex" 
          flexDirection="column"
          justifyContent="center" 
          alignItems="center"
        >  
          <img
            src={horseImg}
            style={{objectFit: "contain", height: "100%", width: "100%"}}
            onClick={onClick}
          />
          {horseNumber}
          </Grid>
}

export default HorseGridElement