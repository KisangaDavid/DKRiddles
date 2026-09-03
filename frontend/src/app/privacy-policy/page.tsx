'use client'

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TopBar from "../_common/TopBar";

function PrivacyPolicyPage() {
  return (
    <>
      <TopBar
        text="Privacy Policy"
        isPuzzlePage={false}
        resetFunc={undefined}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: { lg: "65%", xs: "var(--pageWidthPercent)" },
          position: "relative",
          pb: { xs: "2em", sm: "10em" },
          mt: "2vh",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ mb: "2vh" }}
        >
          Privacy Policy
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: "3vh" }}
        >
          Last updated: 09/02/2026
        </Typography>

        <Typography align="left" sx={{ width: "100%" }}>
          This page informs you of the policies regarding the
          collection and use of information received from users of TheRiddleMan.com.
        </Typography>

        <Typography
          variant="h5"
          component="h2"
          align="left"
          sx={{ width: "100%", mt: "3vh", mb: "0.5em" }}
        >
          1. Information We Collect
        </Typography>

        <Typography align="left" sx={{ width: "100%" }}>
          While using TheRiddleMan.com, you may choose to link your Google account. 
          If you do, you agree to share your email, profile picture, and other basic information with TheRiddleMan.com. 
          This information is only used for sign-in purposes.
        </Typography>

        <Typography
          variant="h5"
          component="h2"
          align="left"
          sx={{ width: "100%", mt: "3vh", mb: "1.5vh" }}
        >
          2. Security
        </Typography>

        <Typography align="left" sx={{ width: "100%" }}>
          The security of your Personal Information is important to us, but
          remember that no method of transmission over the Internet or method
          of electronic storage is 100% secure. Luckily, for you, we don't collect any sensitive personal information!
        </Typography>

        <Typography
          variant="h5"
          component="h2"
          align="left"
          sx={{ width: "100%", mt: "3vh", mb: "1.5vh" }}
        >
          3. Contact Us
        </Typography>

        <Typography align="left" sx={{ width: "100%" }}>
          If you have any questions about this Privacy Policy, please contact
          us at thebigdkindustries@gmail.
        </Typography>
      </Box>
    </>
  );
}

export default PrivacyPolicyPage;