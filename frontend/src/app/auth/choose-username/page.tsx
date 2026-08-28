import TopBar from "@/src/app/_common/TopBar";
import Box from "@mui/material/Box";
import ChooseUsernameForm from "./ChooseUsernameForm";

export default function ChooseUsernamePage() {
  return (
    <>
      <TopBar text="Choose Username" isPuzzlePage={false} resetFunc={undefined} />
      <Box sx={{ display: "flex", position: "relative", width: "var(--pageWidthPercent)", justifyContent: "center" }}>
        <ChooseUsernameForm />
      </Box>
    </>
  );
}