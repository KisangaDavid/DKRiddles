import { useNavigate } from "react-router";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { listItemIconStyle, listItemButtonStyle, listItemTextStyle } from './styles.jsx';
import { SolvedPuzzlesContext, HORSE_PUZZLE, ROOSTER_PUZZLE, RAT_PUZZLE_P1, RAT_PUZZLE_P2 } from './utils.js'
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import ExtensionIcon from '@mui/icons-material/Extension';
import HomeIcon from '@mui/icons-material/Home';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';


function MenuDrawerContents({setMenuDrawerOpen}) {

  const theme = useTheme();
  const { solvedPuzzles, _ } = useContext(SolvedPuzzlesContext);
  const successGreen = theme.palette.success.main;
  const inProgressYellow = theme.palette.warning.light;

  const navigate = useNavigate();

  return (
    <>
      <List sx={{
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        }}
      >
        <ListItem disablePadding>
          <ListItemButton sx={listItemButtonStyle} onClick={() => (setMenuDrawerOpen(false))}>
            <ListItemIcon>
              <KeyboardDoubleArrowLeftIcon sx={listItemIconStyle} />
            </ListItemIcon>
            <ListItemText sx={listItemTextStyle} primary={"Close"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={listItemButtonStyle} onClick={() => {navigate("/")}}>
            <ListItemIcon>
              <HomeIcon sx={listItemIconStyle} />
            </ListItemIcon>
            <ListItemText sx={listItemTextStyle} primary={"Introduction"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={listItemButtonStyle} onClick={() => {navigate("/about")}}>
              <ListItemIcon>
                <InfoOutlinedIcon sx={listItemIconStyle} />
              </ListItemIcon>
              <ListItemText sx={listItemTextStyle} primary={"About This Site"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <ListItem>
        <ListItemText sx={listItemTextStyle}primary={"All Puzzles"} />
      </ListItem>
        <List sx={{
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        }}
      >
        <ListItem disablePadding>
          <ListItemButton sx={listItemButtonStyle} onClick={() => navigate("/ratRiddle")}>
            <ListItemIcon>
              {solvedPuzzles.has(RAT_PUZZLE_P2) ? 
                <CheckRoundedIcon sx={[listItemIconStyle, { color: successGreen }]} />
              : 
                solvedPuzzles.has(RAT_PUZZLE_P1) ?
                  <CheckRoundedIcon sx={[listItemIconStyle, { color: inProgressYellow }]} />
                :
                  <ExtensionIcon sx={listItemIconStyle} />
              }
            </ListItemIcon>
            <ListItemText sx={listItemTextStyle} secondary={"The Sneaky Rat"} />
                  <ListItemIcon>
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={listItemButtonStyle} onClick={() => navigate("/horseRiddle")} >
            <ListItemIcon>
              <ListItemIcon>
              {solvedPuzzles.has(HORSE_PUZZLE) ? 
                <CheckRoundedIcon sx={[listItemIconStyle, { color: successGreen }]} />
              : 
                <ExtensionIcon sx={listItemIconStyle} />
              }
            </ListItemIcon>
            </ListItemIcon>
            <ListItemText sx={listItemTextStyle} secondary={"The Horse Trifecta"} />
          </ListItemButton>
          
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={listItemButtonStyle} onClick={() => navigate("/roosterRiddle")}>
            <ListItemIcon>
              {solvedPuzzles.has(ROOSTER_PUZZLE) ? 
                <CheckRoundedIcon sx={[listItemIconStyle, { color: successGreen }]} />
              : 
                <ExtensionIcon sx={listItemIconStyle} />
              }
            </ListItemIcon>
            <ListItemText sx={listItemTextStyle} secondary={"The Undefeated Rooster"} />
          </ListItemButton>
        </ListItem>
        </List>
        <Divider />
        <ListItem>
          <ListItemText sx={listItemTextStyle} primary={"All Puzzle Breakdowns"} />
          </ListItem>
      <List sx={{
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        }}
      >
        <ListItem disablePadding>
          <ListItemButton sx={listItemButtonStyle} onClick={() => navigate("/ratRiddle/breakdown")}>
            <ListItemIcon>
              <TipsAndUpdatesOutlinedIcon
                sx={[
                  listItemIconStyle,
                  solvedPuzzles.has(RAT_PUZZLE_P2)  ?
                    {color: successGreen}
                  : 
                    solvedPuzzles.has(RAT_PUZZLE_P1) ? 
                      {color: inProgressYellow}
                    :
                      {}
                ]}
              />
            </ListItemIcon>
            <ListItemText sx={listItemTextStyle} secondary={"Rat Puzzle Breakdown"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={listItemButtonStyle} onClick={() => navigate("/horseRiddle/breakdown")} >
            <ListItemIcon>
              <TipsAndUpdatesOutlinedIcon       
                sx={[
                  listItemIconStyle,
                  solvedPuzzles.has(HORSE_PUZZLE) && { color: successGreen },
                ]} 
              />
            </ListItemIcon>
            <ListItemText sx={listItemTextStyle} secondary={"Horse Puzzle Breakdown"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={listItemButtonStyle} onClick={() => navigate("/roosterRiddle/breakdown")}>
            <ListItemIcon>
              <TipsAndUpdatesOutlinedIcon                    
                sx={[
                  listItemIconStyle,
                  solvedPuzzles.has(ROOSTER_PUZZLE) && { color: successGreen }
                ]} 
              />
            </ListItemIcon>
            <ListItemText sx={listItemTextStyle} secondary={"Rooster Puzzle Breakdown"} />
          </ListItemButton>
        </ListItem>
        </List>
    </>
  );
}

export default MenuDrawerContents;