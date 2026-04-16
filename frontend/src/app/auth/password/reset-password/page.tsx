import TopBar from '../../../_common/TopBar';
import Box from '@mui/material/Box';
import ResetPasswordForm from './ResetPasswordForm';

function ResetPasswordPage() {
  return (
    <>
      <TopBar text="Reset Password" isPuzzlePage={false} resetFunc={undefined} />
        <Box sx={{ display: "flex", position: "relative", width: 'var(--pageWidthPercent)', justifyContent: "center"}}>
          <ResetPasswordForm />
        </Box>
    </>
  );
}

export default ResetPasswordPage;