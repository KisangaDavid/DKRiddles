import { Button } from "@mui/material";

type SubmitButtonProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  sx?: any;
};
const SubmitButton = ({ children, onClick, sx }: SubmitButtonProps) => {
  return (
    <Button
        type = "submit"
        onClick={onClick}
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
