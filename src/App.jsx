import RatRiddlePage from './components/ratRiddle/RatRiddlePage.jsx';
import IntroductionPage from './components/intro/IntroductionPage.jsx';
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
          transitions: {
            duration: {
              standardTextFade: 1000,
              standardImageFade: 1500,
              longTextFade: 2000
            }
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
          <Route path="/" element={<IntroductionPage />}/>
          <Route path="/ratRiddle" element={<RatRiddlePage />}/>
          </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
