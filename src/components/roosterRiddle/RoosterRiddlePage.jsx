import { useState, useCallback } from 'react';
import { useWindowSize } from 'react-use';
import { useTheme } from '@mui/material/styles';

import RootBackground from "../common/RootBackground.jsx";
import RoosterRiddleDescription from './RoosterRiddleDescription.jsx';
import Confetti from 'react-confetti'
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Box from "@mui/material/Box";
import TopBar from '../common/TopBar.jsx';



function RoosterRiddlePage({wasmModule}) {
  const theme = useTheme();

  return (
  <RootBackground>
    
  </RootBackground>
  )
}

export default RoosterRiddlePage