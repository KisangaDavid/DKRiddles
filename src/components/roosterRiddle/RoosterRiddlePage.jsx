import { useState, useEffect, useCallback } from 'react';
import { useWindowSize } from 'react-use';
import { useTheme } from '@mui/material/styles';
import { convertIterableToInt, convertIntToArray, MAX_32_BIT_NUM } from "../common/utils.js";

import RootBackground from "../common/RootBackground.jsx";
import RoosterRiddleDescription from './RoosterRiddleDescription.jsx';
import Confetti from 'react-confetti'
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Box from "@mui/material/Box";
import TopBar from '../common/TopBar.jsx';

const NUM_BITS_PER_PILE = 4;
const NUM_PILES = 4;

function RoosterRiddlePage({wasmModule}) {
  const theme = useTheme();
  const [piles, setPiles] = useState([]);

    useEffect(() => {
      generateAndSetPiles();
    }, []);

  const generateAndSetPiles = () => {
    let pilesIntForm = wasmModule.exports.getInitialPiles(Math.floor(Math.random() * MAX_32_BIT_NUM));
    let piles = convertIntToArray(pilesIntForm, NUM_BITS_PER_PILE, NUM_PILES);
    // console.log("piles are: " + piles);
    // console.log("nimsum of piles: " + (piles[0] ^ piles[1] ^ piles[2] ^ piles[3]));
    setPiles(piles);
  };

  return (
  <RootBackground>
    <TopBar text="Envelope #3: The Undefeated Rooster" isHomePage={false} />
    <RoosterRiddleDescription />
    
  </RootBackground>
  )
}

export default RoosterRiddlePage