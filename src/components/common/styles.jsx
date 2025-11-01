export const typography = {
  fontFamily: 'Segoe UI, Avenir, Inter, sans-serif',
  h1: {
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: -0.5,
  },
  h2: {
    fontWeight: 600,
    lineHeight: 1.2,
  },
  h3: {
    fontWeight: 600,
    lineHeight: 1.2,
  },
  h4: {
    fontWeight: 600,
    lineHeight: 1.5,
  },
  h5: {
    fontWeight: 600,
  },
  h6: {
    fontWeight: 600,
  },
  subtitle2: {
    fontWeight: 500,
  },
  body2: {
    fontWeight: 400,
  },
  caption: {
    fontWeight: 400,
  },
};

export const transitionDurations = {
  standardTextFade: 1000,
  shortImageZoom: 500,
  shortImageFade: 750,
  standardImageFade: 1500,
  longTextFade: 2000
}

export const delayDurations = {
  shortDelay: 200,
  standardDelay: 250,
  longDelay: 500,
  extraLongDelay: 750
}

export const shape = {
  borderRadius: 8
}

export const breakdownCardContentStyle = {
  display: "flex",
  flexDirection: "column",
  padding: "8px",
  paddingTop: "8px",
  flexGrow: 1,
  backgroundImage: 
   "radial-gradient(ellipse 55% 55% at 50% -5%, hsl(210, 100%, 16%), hsla(208, 100.00%, 3.70%, 0.64))",
  height: "100%",
  "&:last-child": {
    paddingBottom: "8px",
  },
};

export const breakdownCardStyle = {
  padding: 0,
  gap: 0,
  backgroundColor:'hsl(220, 20%, 88%)',
  border: `1px solid hsla(0, 0%, 61%, 0.70)`,
  boxShadow: 10
};

export const puzzleCardStyle = {
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  background: 'hsla(220, 35%, 3%, 0.4)',
  border: `1px solid hsla(0, 0%, 23%, 0.60)`,
  boxShadow: 'hsla(223, 41%, 3%, 0.70) 0px 0px 20px 0px, hsla(220, 29%, 8%, 0.80) 0px 0px 20px 0px',
  '&:hover': {
    boxShadow: 'hsla(0, 0%, 36%, 0.70) 0px 0px 16px 0px, hsla(240, 1%, 40%, 0.80) 0px 0px 16px 0px',
    cursor: 'pointer',
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
};

export const puzzleCardContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: "4px",
  padding: "16px",
  paddingTop: "32px",
  flexGrow: 1,
  backgroundImage:
    "radial-gradient(ellipse 55% 55% at 50% -5%, hsl(210, 100%, 16%), hsla(208, 100.00%, 3.70%, 0.64))",
  height: "100%",
  '&:last-child': {
    paddingBottom: "16px",
    },
  };

export const listItemIconStyle = {
  minWidth: '0rem',
  width: '2rem',
  height: '2rem',
  color: "rgba(255, 255, 255, 0.7)"
}

export const listItemButtonStyle = {
  py: "1.5vh", 
  borderRadius: "8px"
}

export const listItemTextStyle = {
      '& .MuiListItemText-primary': {
        color: "white",
        fontSize: "14px",
        fontWeight: 500,
      },
       '& .MuiListItemText-secondary': {
        color: "white",
        fontWeight: 400,
        fontSize: "14px",
      },
    };
