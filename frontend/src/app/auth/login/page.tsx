import Fade from '@mui/material/Fade';
import { standardTextFade } from '@/src/app/_common/constants';
import TopBar from '@/src/app/_common/TopBar';
import LoginForm from "./LoginForm";
import Box from '@mui/material/Box';

function LoginPage() {
  return (
    <>
      <TopBar text="Log In" isPuzzlePage={false} resetFunc={undefined} />
        <Box sx={{ display: "flex", position: "relative", width: 'var(--pageWidthPercent)', justifyContent: "center"}}>
          <LoginForm />
        </Box>
    </>
  );
}

export default LoginPage;