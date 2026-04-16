'use client';

import { createTheme } from '@mui/material/styles';

const typography = {
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
    fontWeight: 400,
    lineHeight: 1.8,
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

const shape = {
  borderRadius: 8
}

const theme = createTheme({
  palette: {
    mode: "dark"
  },
  typography,
  shape,
});

export default theme;