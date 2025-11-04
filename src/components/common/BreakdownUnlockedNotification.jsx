import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router";
import Alert from "@mui/material/Alert";

function BreakdownUnlockedNotification({ open, onClose, text}) {

  const navigate = useNavigate();

  const handleSnackbarClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    onClose();
  };

  const handleAlertClose = (event, reason) => {
    event.stopPropagation();
    if (reason === "clickaway") {
      return;
    }
    onClose();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      onClose={handleSnackbarClose}
      onClick={() => {navigate("breakdown")}}
      sx={{cursor: "pointer"}}
    >
      <Alert
        onClose={handleAlertClose}
        color="success"
        variant="standard"
        sx={{ width: "100%", backgroundColor: "hsl(144, 63%, 16%)"}}
      >
        {text}
      </Alert>
    </Snackbar>
  );
}

export default BreakdownUnlockedNotification;
