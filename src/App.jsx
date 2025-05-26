import RatRiddlePage from './components/ratRiddle/RatRiddlePage.jsx';
import HomePage from './components/home/HomePage.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from "react-router";
import './App.css';

const theme = createTheme({
   palette: {
    mode: 'dark',
  },
  transitions: {
    duration: {
      enteringScreen: 200,
      leavingScreen: 200,
      short: 100,
      medium: 200,
      long: 300,
    },
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
