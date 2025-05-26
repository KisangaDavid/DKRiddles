import { useState, useEffect } from 'react'


import MenuDrawerConents from '/src/components/common/MenuDrawerContents.jsx';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Zoom from '@mui/material/Zoom';
import RefreshIcon from '@mui/icons-material/Refresh';
import Box from "@mui/material/Box";
import TopBar from '/src/components/common/TopBar.jsx';


function HomePage() {

  return (
    <Box sx={{
      display:"flex",
      flexDirection: 'column',
      alignItems: "center",
      height: "100vh",
      width: "100vw",
      overflow: "hidden"
    }}>
      <TopBar text="Home Page" isHomePage={true} sx={{width: "100%"}}/>
      WIP. Currently only the hiding rat riddle is done - go check it out using the dropdown menu on the top left.
    </Box>
  );
}

export default HomePage;
