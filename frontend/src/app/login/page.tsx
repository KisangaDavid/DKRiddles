"use client";

import Fade from '@mui/material/Fade';
import { standardTextFade } from '../_common/constants';
import TopBar from '../_common/TopBar';
import LoginForm from "@/src/app/login/LoginForm";
import Box from '@mui/material/Box';

function LoginPage() {
  return (
    <>
      <TopBar text="Log In" isPuzzlePage={false} resetFunc={undefined} />
      <Fade in={true} mountOnEnter unmountOnExit timeout={standardTextFade}>
        <Box sx={{ display: "flex", position: "relative", width: 'var(--pageWidthPercent)', justifyContent: "center"}}>
        <LoginForm />
        </Box>
      </Fade>
    </>
  );
}

export default LoginPage;