import Link from "next/link.js";
import { useTheme } from "@mui/material/styles";
import { useContext, FC } from "react";
import { styled } from '@mui/material/styles';
import { SolvedPuzzlesContext, HORSE_PUZZLE, ROOSTER_PUZZLE, RAT_PUZZLE_P1, RAT_PUZZLE_P2, RABBIT_PUZZLE_P1, RABBIT_PUZZLE_P2 } from './utils'
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
import { SvgIconProps } from "@mui/material/SvgIcon";

const StyledListItemButton = styled(ListItemButton)({
  paddingTop: "1.5vh",
  paddingBottom: "1.5vh",
  borderRadius: "8px"
});

const StyledListItemText = styled(ListItemText)({
  '& .MuiListItemText-primary': {
    color: "white",
    fontSize: "14px",
    fontWeight: 500,
  },
  '& .MuiListItemText-secondary': {
    color: "white",
    fontWeight: 400,
    fontSize: "14px",
  },
});

interface StyledListItemIconProps {
  PassedIcon: FC<SvgIconProps>;
  complete?: boolean;
  inProgress?: boolean;
}

function StyledListItemIcon({PassedIcon, complete = false, inProgress=false}: StyledListItemIconProps) { 
  const theme = useTheme();
  return (
    <ListItemIcon>
      <PassedIcon
        sx={{
          minWidth: '0rem',
          width: '2rem',
          height: '2rem',
          color: 
            complete ? 
              theme.palette.success.main : 
              inProgress ? 
                theme.palette.warning.light :
                "rgba(255, 255, 255, 0.7)"
        }}
      />
    </ListItemIcon>
  );
};

interface props {
  setMenuDrawerOpen: (open: boolean) => void;
}

function MenuDrawerContents({setMenuDrawerOpen}: props) {
  let {solvedPuzzles} = useContext(SolvedPuzzlesContext);
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
          <StyledListItemButton onClick={() => (setMenuDrawerOpen(false))}>
            <StyledListItemIcon PassedIcon={KeyboardDoubleArrowLeftIcon} />
            <StyledListItemText primary={"Close"} />
          </StyledListItemButton>
        </ListItem>
        <Link href="/">
          <ListItem disablePadding>    
            <StyledListItemButton>
              <StyledListItemIcon PassedIcon={HomeIcon} />
              <StyledListItemText primary={"Introduction"} />
            </StyledListItemButton>
          </ListItem>
        </Link>
        <Link href="/about/">
          <ListItem disablePadding>
            <StyledListItemButton>
              <StyledListItemIcon PassedIcon={InfoOutlinedIcon} />
              <StyledListItemText primary={"About This Site"} />
            </StyledListItemButton>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <ListItem>
        <StyledListItemText primary={"All Puzzles"} />
      </ListItem>
        <List sx={{
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        }}
      >
        <Link href="/ratRiddle/">
          <ListItem disablePadding>      
            <StyledListItemButton>
              <StyledListItemIcon 
                PassedIcon={solvedPuzzles.has(RAT_PUZZLE_P1) ? CheckRoundedIcon : ExtensionIcon}
                complete={solvedPuzzles.has(RAT_PUZZLE_P2)}
                inProgress={solvedPuzzles.has(RAT_PUZZLE_P1)}
              />
              <StyledListItemText secondary={"The Sneaky Rat"} />
            </StyledListItemButton>
          </ListItem> 
        </Link>     
        <Link href="/horseRiddle/">
          <ListItem disablePadding>
            <StyledListItemButton>
              <StyledListItemIcon 
                PassedIcon={solvedPuzzles.has(HORSE_PUZZLE) ? CheckRoundedIcon : ExtensionIcon}
                complete={solvedPuzzles.has(HORSE_PUZZLE)}
              />
              <StyledListItemText secondary={"Horse Trifecta"} />
            </StyledListItemButton>
          </ListItem>
        </Link>
        <Link href="/roosterRiddle/">
          <ListItem disablePadding>
            <StyledListItemButton>
              <StyledListItemIcon 
                PassedIcon={solvedPuzzles.has(ROOSTER_PUZZLE) ? CheckRoundedIcon : ExtensionIcon}
                complete={solvedPuzzles.has(ROOSTER_PUZZLE)}
              />
              <StyledListItemText secondary={"The Undefeated Rooster"} />
            </StyledListItemButton>
          </ListItem> 
        </Link>
         <Link href="/rabbitRiddle/">
          <ListItem disablePadding>
            <StyledListItemButton>
               <StyledListItemIcon 
                PassedIcon={solvedPuzzles.has(RABBIT_PUZZLE_P1) ? CheckRoundedIcon : ExtensionIcon}
                complete={solvedPuzzles.has(RABBIT_PUZZLE_P2)}
                inProgress={solvedPuzzles.has(RABBIT_PUZZLE_P1)}
              />
              <StyledListItemText secondary={"Jumping Rabbits"} />
            </StyledListItemButton>
          </ListItem> 
        </Link>
      </List>
      <Divider />
      <ListItem>
        <StyledListItemText primary={"All Puzzle Breakdowns"} />
      </ListItem>
      <List sx={{
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        }}
      >
        <Link href="/ratRiddle/breakdown/">
          <ListItem disablePadding>
            <StyledListItemButton>
              <StyledListItemIcon 
                PassedIcon={TipsAndUpdatesOutlinedIcon} 
                complete={solvedPuzzles.has(RAT_PUZZLE_P2)} 
                inProgress={solvedPuzzles.has(RAT_PUZZLE_P1)}
              />
              <StyledListItemText secondary={"Rat Puzzle Breakdown"} />
            </StyledListItemButton>
          </ListItem>
        </Link>
        <Link href="/horseRiddle/breakdown/">
          <ListItem disablePadding>
            <StyledListItemButton>
              <StyledListItemIcon 
                PassedIcon={TipsAndUpdatesOutlinedIcon} 
                complete={solvedPuzzles.has(HORSE_PUZZLE)}
              />
              <StyledListItemText secondary={"Horse Puzzle Breakdown"} />
            </StyledListItemButton>
          </ListItem>
        </Link>
        <Link href="/roosterRiddle/breakdown/">
          <ListItem disablePadding>
            <StyledListItemButton>
              <StyledListItemIcon 
                PassedIcon={TipsAndUpdatesOutlinedIcon} 
                complete={solvedPuzzles.has(ROOSTER_PUZZLE)}
              />
              <StyledListItemText secondary={"Rooster Puzzle Breakdown"} />
            </StyledListItemButton>
          </ListItem>
        </Link>
          <Link href="/rabbitRiddle/breakdown/">
          <ListItem disablePadding>
            <StyledListItemButton>
               <StyledListItemIcon 
                PassedIcon={TipsAndUpdatesOutlinedIcon} 
                complete={solvedPuzzles.has(RABBIT_PUZZLE_P2)} 
                inProgress={solvedPuzzles.has(RABBIT_PUZZLE_P1)}
              />
              <StyledListItemText secondary={"Rabbit Puzzle Breakdown"} />
            </StyledListItemButton>
          </ListItem>
        </Link>
      </List> 
    </>
  );
}

export default MenuDrawerContents;