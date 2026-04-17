import TopBar from '../../../_common/TopBar';
import Box from '@mui/material/Box';
import ResetPasswordConfirmationForm from './ResetPasswordConfirmForm';

type Props = {
  searchParams: Promise<{
    uid?: string;
    token?: string;
  }>;
};

async function ResetPasswordConfirmationPage({ searchParams }: Props) {
  const { uid = "", token = "" } = await searchParams;
  console.log(searchParams);
  return (
    <>
      <TopBar text="Reset Password" isPuzzlePage={false} resetFunc={undefined} />
        <Box sx={{ display: "flex", position: "relative", width: 'var(--pageWidthPercent)', justifyContent: "center"}}>
          <ResetPasswordConfirmationForm uid={uid} token={token} />
        </Box>
    </>
  );
}

export default ResetPasswordConfirmationPage;