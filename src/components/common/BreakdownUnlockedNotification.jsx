import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router";
import Alert from "@mui/material/Alert";

function BreakdownUnlockedNotification({ open, onClose, text, color }) {

  const navigate = useNavigate();
  const handleClose = (event, reason) => {
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
      onClose={handleClose}
      onClick={() => {navigate("breakdown")}}
      sx={{
        cursor: "pointer"
      }}
    >
      <Alert
        onClose={handleClose}
        color="success"
        variant="standard"
        sx={{ width: "100%", backgroundColor: "hsla(137, 77%, 36%, 0.26)" }}
      >
        {text}
      </Alert>
    </Snackbar>
  );
}

export default BreakdownUnlockedNotification;
