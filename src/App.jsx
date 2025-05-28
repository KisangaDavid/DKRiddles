import RatRiddlePage from './components/ratRiddle/RatRiddlePage.jsx';
import HomePage from './components/home/HomePage.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from "react-router";
import { styleOverrides } from './components/common/styleOverrides.js';
import { colorSchemes, typography, shadows, shape } from '/src/components/common/themePrimitives';
import './App.css';

const theme = createTheme({
          cssVariables: {
            colorSchemeSelector: 'data-mui-color-scheme',
            cssVarPrefix: 'template',
          },
          colorSchemes, 
          typography,
          shadows,
          shape,
          components: {
            ...styleOverrides,
          },
        });
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/ratRiddle" element={<RatRiddlePage />}/>
          </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
