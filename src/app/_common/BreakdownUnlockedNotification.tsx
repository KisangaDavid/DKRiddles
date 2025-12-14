'use client'

import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import { usePathname } from 'next/navigation'
import Link from "next/link";
import Alert from "@mui/material/Alert";
import { SyntheticEvent } from "react";

interface props {
  open: boolean;
  onClose: () => void;
  text: string;
}

function BreakdownUnlockedNotification({ open, onClose, text} : props) {
  const pathname = usePathname();

  const handleSnackbarClose = (_: Event | SyntheticEvent, reason: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }
    onClose();
  };

  const handleAlertClose = (event: SyntheticEvent) => {
    event.preventDefault();
    onClose();
  };

  return (
    <Link href={pathname + "breakdown"}>
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
