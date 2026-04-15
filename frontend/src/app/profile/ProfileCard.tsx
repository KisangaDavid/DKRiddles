"use client"

import { Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Card } from "@mui/material";
import { AuthActions } from "../auth/utils";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { SolvedPuzzlesContext } from "../_common/SolvedPuzzlesContextProvider";
const { logout, removeTokens } = AuthActions();

const StyledCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  background: 'hsla(220, 35%, 3%, 0.4)',
  border: `1px solid hsla(0, 0%, 23%, 0.60)`,
  boxShadow: 'hsla(223, 41%, 3%, 0.70) 0px 0px 20px 0px, hsla(220, 29%, 8%, 0.80) 0px 0px 20px 0px',
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
});

interface ProfileCardProps {
  user: {
    username?: string;
    email?: string;
  }
};

function ProfileCard({user} : ProfileCardProps) {
    const router = useRouter();
    const { clearSolvedPuzzles } = useContext(SolvedPuzzlesContext)
    
    const handleLogout = () => {
      logout()
        .res(() => {
          removeTokens();
          clearSolvedPuzzles();
          router.push("/");
        })
        .catch(() => {
          removeTokens();
          clearSolvedPuzzles();
          router.push("/");
        });
    };

    return (
      <StyledCard sx={{ width: {xs: "80%", sm: "65%", md: "50%", lg: "35%" }, mt: {xs: "2em", md: "4em"}}}>
        <Typography variant="h5" sx={{mt:"0.5em"}}>Profile Information:</Typography>
        <Typography>username: {user?.username}</Typography>
        <Typography>email: {user?.email}</Typography>
        <button
          onClick={handleLogout}
        >
          Disconnect
        </button>
      </StyledCard>
    );
};

export default ProfileCard;