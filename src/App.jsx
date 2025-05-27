import RatRiddlePage from './components/ratRiddle/RatRiddlePage.jsx';
import HomePage from './components/home/HomePage.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from "react-router";
// import { inputsCustomizations } from './customizations/inputs';
// import { dataDisplayCustomizations } from './customizations/dataDisplay';
// import { feedbackCustomizations } from './customizations/feedback';
// import { navigationCustomizations } from './customizations/navigation';
import { cardOverrides } from './components/common/cardOverrides';
import { colorSchemes, typography, shadows, shape } from '/src/components/common/themePrimitives';
import './App.css';

// const theme = createTheme({
//    palette: {
//     mode: 'dark',
//   },
//   transitions: {
//     duration: {
//       enteringScreen: 200,
//       leavingScreen: 200,
//       short: 100,
//       medium: 200,
//       long: 300,
//     },
//   },
// });

const theme = createTheme({
          // For more details about CSS variables configuration, see https://mui.com/material-ui/customization/css-theme-variables/configuration/
          cssVariables: {
            colorSchemeSelector: 'data-mui-color-scheme',
            cssVarPrefix: 'template',
          },
          colorSchemes, // Recently added in v6 for building light & dark mode app, see https://mui.com/material-ui/customization/palette/#color-schemes
          typography,
          shadows,
          shape,
          components: {
            ...cardOverrides,
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
