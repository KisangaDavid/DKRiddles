import TopBar from '../../../_common/TopBar';
import Box from '@mui/material/Box';
import ResetPasswordConfirmationForm from './ResetPasswordConfirmForm';

function ResetPasswordConfirmationPage() {
  return (
    <>
      <TopBar text="Reset Password" isPuzzlePage={false} resetFunc={undefined} />
        <Box sx={{ display: "flex", position: "relative", width: 'var(--pageWidthPercent)', justifyContent: "center"}}>
          <ResetPasswordConfirmationForm />
        </Box>
    </>
  );
}

export default ResetPasswordConfirmationPage;