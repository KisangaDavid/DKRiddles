import { useNavigate } from "react-router";
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ExtensionIcon from '@mui/icons-material/Extension';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';


function MenuDrawerContents({setMenuDrawerOpen, isIntroPage}) {

  const navigate = useNavigate();

  return (
    <>
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{py: "1.5vh"}} onClick={() => (setMenuDrawerOpen(false))}>
            <ListItemIcon>
              <KeyboardDoubleArrowLeftIcon />
            </ListItemIcon>
            <ListItemText primary={isIntroPage ? "Back to Introduction" : "Back to Puzzle"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{py: "1.5vh"}} onClick={() => {navigate("/")}}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Introduction"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{py: "1.5vh"}}>
              <ListItemIcon>
                <HelpOutlineIcon />
              </ListItemIcon>
              <ListItemText primary={isIntroPage ? "About this site" : "About This Puzzle"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <ListItem>
        <ListItemText primary={"All Puzzles"} /></ListItem>
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{py: "1.5vh"}} onClick={() => navigate("/ratRiddle")}>
            <ListItemIcon>
              <ExtensionIcon />
            </ListItemIcon>
            <ListItemText primary={"The Sneaky Rat"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{py: "1.5vh"}}>
            <ListItemIcon>
              <ExtensionIcon />
            </ListItemIcon>
            <ListItemText primary={"Placeholder Puzzle 2"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{py: "1.5vh"}}>
            <ListItemIcon>
              <ExtensionIcon /> 
            </ListItemIcon>
            <ListItemText primary={"Placeholder Puzzle 3"} />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
}

export default MenuDrawerContents;