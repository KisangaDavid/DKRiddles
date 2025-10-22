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


function MenuDrawerContents({setMenuDrawerOpen, isPuzzlePage}) {

  const navigate = useNavigate();

  return (
    <>
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{py: "1.5vh"}} onClick={() => (setMenuDrawerOpen(false))}>
            <ListItemIcon>
              <KeyboardDoubleArrowLeftIcon />
            </ListItemIcon>
            <ListItemText primary={"Close"} />
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
          <ListItemButton sx={{py: "1.5vh"}} onClick={() => {isPuzzlePage ? navigate("breakdown") : navigate("/about")}}>
              <ListItemIcon>
                <HelpOutlineIcon />
              </ListItemIcon>
              <ListItemText primary={isPuzzlePage ? "Puzzle Breakdown" : "About This Site"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <ListItem>
        <ListItemText primary={"All Puzzles"} />
      </ListItem>
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
          <ListItemButton sx={{py: "1.5vh"}} onClick={() => navigate("/horseRiddle")} >
            <ListItemIcon>
              <ExtensionIcon />
            </ListItemIcon>
            <ListItemText primary={"The Horse Trifecta"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{py: "1.5vh"}} onClick={() => navigate("/roosterRiddle")}>
            <ListItemIcon>
              <ExtensionIcon /> 
            </ListItemIcon>
            <ListItemText primary={"The Undefeated Rooster"} />
          </ListItemButton>
        </ListItem>
        </List>
        
        <Divider />
        <ListItem>
          <ListItemText primary={"All Puzzle Breakdowns"} />
          </ListItem>
                <List>
        <ListItem disablePadding>
          <ListItemButton sx={{py: "1.5vh"}} onClick={() => navigate("/ratRiddle/breakdown")}>
            <ListItemIcon>
               <HelpOutlineIcon />
            </ListItemIcon>
            <ListItemText primary={"Rat Puzzle Breakdown"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{py: "1.5vh"}} onClick={() => navigate("/horseRiddle/breakdown")} >
            <ListItemIcon>
               <HelpOutlineIcon />
            </ListItemIcon>
            <ListItemText primary={"Horse Puzzle Breakdown"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{py: "1.5vh"}} onClick={() => navigate("/roosterRiddle/breakdown")}>
            <ListItemIcon>
               <HelpOutlineIcon />
            </ListItemIcon>
            <ListItemText primary={"Rooster Puzzle Breakdown"} />
          </ListItemButton>
        </ListItem>
        </List>
      
    </>
  );
}

export default MenuDrawerContents;