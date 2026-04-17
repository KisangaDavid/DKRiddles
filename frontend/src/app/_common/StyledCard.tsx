import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { ReactNode, forwardRef } from "react";
import { Fade, SxProps, Theme } from "@mui/material";
import { standardTextFade } from "./constants";

const StyledCardWrapper = styled(Card)({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  height: "100%",
  background: "hsla(220, 35%, 3%, 0.4)",
  border: `1px solid hsla(0, 0%, 23%, 0.60)`,
  boxShadow:
    "hsla(223, 41%, 3%, 0.70) 0px 0px 20px 0px, hsla(220, 29%, 8%, 0.80) 0px 0px 20px 0px",
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "2px",
  },
});

interface StyledCardProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

const StyledCard = forwardRef<HTMLDivElement, StyledCardProps>(
  function StyledCard({ children, sx }, ref) {
    return (
      <Fade in={true} timeout={standardTextFade} unmountOnExit mountOnEnter>
        <StyledCardWrapper ref={ref} sx={sx}>
          {children}
        </StyledCardWrapper>
      </Fade>
    );
  }
);

export default StyledCard;