'use client'

import Snackbar from "@mui/material/Snackbar";
import { usePathname } from 'next/navigation'
import Link from "next/link";
import Alert from "@mui/material/Alert";

function BreakdownUnlockedNotification({ open, onClose, text}) {
  const pathname = usePathname();
  const handleSnackbarClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    onClose();
  };

  const handleAlertClose = (event, reason) => {
    event.preventDefault();
    if (reason === "clickaway") {
      return;
    }
    onClose();
  };

  return (
    <Link href={pathname + "/breakdown/"}>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleSnackbarClose}
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
    </Link>
  );
}

export default BreakdownUnlockedNotification;
