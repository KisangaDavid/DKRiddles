import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TopBar from "../_common/TopBar";

function TermsOfServicePage() {
  return (
    <>
      <TopBar
        text="Terms of Service"
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
          Terms of Service
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: "3vh" }}
        >
          Last updated: 09/02/2026
        </Typography>

        <Typography align="center" variant="h6" sx={{ width: "100%" }}>
          Welcome to TheRiddleMan.com! By interacting with the website, you agree to the following terms:
        </Typography>
    <Typography
          variant="h5"
          component="h2"
          align="left"
          sx={{ width: "100%", mt: "1em", mb:"0.5em"}}
        >
          1. Copyright
        </Typography>

        <Typography align="left" sx={{ width: "100%" }}>
          All content on this website is the property of TheRiddleMan.com. Don't copy anything without explicit permission!
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          align="left"
          sx={{ width: "100%", mt: "3vh", mb:"0.5em" }}
        >
          2. Google OAuth and Data Access
        </Typography>

        <Typography align="left" sx={{ width: "100%" }}>
          Account registration at TheRiddleMan.com is handled through Google OAuth. 
          Should you choose to create an account, you agree for your Google email address to be shared with the site. 
          No user data is ever shared with outside entities. TheRiddleMan.com fully complies with the Google API Services
          User Data Policy, including the limited use requirements.
        </Typography>

        <Typography
          variant="h5"
          component="h2"
          align="left"
          sx={{ width: "100%", mt: "3vh", mb:"0.5em" }}
        >
          3. User Responsibilities
        </Typography>

        <Typography align="left" sx={{ width: "100%" }}>
          You agree not to misuse the website application or help anyone else to do so.
          You are responsible for keeping your own account secure.
        </Typography>


        <Typography
          variant="h5"
          component="h2"
          align="left"
          sx={{ width: "100%", mt: "3vh", mb:"0.5em" }}
        >
          6. Contact Us
        </Typography>

        <Typography align="left" sx={{ width: "100%" }}>
          If you have questions about these terms, you may contact TheRiddleMan team at thebigdkindustries@gmail.com.
        </Typography>
      </Box>
    </>
  );
}

export default TermsOfServicePage;