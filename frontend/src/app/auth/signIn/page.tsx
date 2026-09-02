import TopBar from '@/src/app/_common/TopBar';
import SignInForm from "./SignInForm";
import Box from '@mui/material/Box';

function SignInPage() {
  return (
    <>
      <TopBar text="Sign In" isPuzzlePage={false} resetFunc={undefined} />
        <Box sx={{ display: "flex", position: "relative", width: 'var(--pageWidthPercent)', justifyContent: "center"}}>
          <SignInForm />
        </Box>
    </>
  );
}

export default SignInPage;