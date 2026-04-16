import Fade from '@mui/material/Fade';
import { standardTextFade } from '@/src/app/_common/constants';
import TopBar from '@/src/app/_common/TopBar';
import CreateAccountForm from "./CreateAccountForm";
import Box from '@mui/material/Box';

function CreateAccountPage() {
  return (
    <>
      <TopBar text="Create Account" isPuzzlePage={false} resetFunc={undefined} />
        <Box sx={{ display: "flex", position: "relative", width: 'var(--pageWidthPercent)', justifyContent: "center"}}>
          <CreateAccountForm />
        </Box>
    </>
  );
} 

export default CreateAccountPage;