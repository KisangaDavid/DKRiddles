import { Button } from "@mui/material";
import type { ComponentProps } from "react";

type SubmitButtonProps = ComponentProps<typeof Button> & {
  children: React.ReactNode;
};

const SubmitButton = ({
  children,
  sx,
  type = "submit",
  ...rest
}: SubmitButtonProps) => {
  return (
    <Button
      type={type}
      {...rest}
      sx={{
        paddingLeft: "1.75rem",
        paddingRight: "1.75rem",
        lineHeight: "1",
        color: "white",
        textTransform: "none",
        transition: "background-color 200ms, color 200ms",
        backgroundColor: "#2563eb",
        borderRadius: "0.375rem",
        border: "none",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#1d4ed8",
        },
        ...sx,
      }}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;