import { useState, useEffect } from "react";
import init from './wasm/allModules.wasm?init'
import RatRiddlePage from './components/ratRiddle/RatRiddlePage.jsx';
import RatRiddleBreakdownPage from './components/breakdown/RatRiddleBreakdownPage.jsx';
import HorseRiddlePage from './components/horseRiddle/HorseRiddlePage.jsx';
import HorseRiddleBreakdownPage from './components/breakdown/HorseRiddleBreakdownPage.jsx';
import RoosterRiddlePage from './components/roosterRiddle/RoosterRiddlePage.jsx';
import RoosterRiddleBreakdownPage from './components/breakdown/RoosterRiddleBreakdownPage.jsx';
import IntroductionPage from './components/intro/IntroductionPage.jsx';
import AboutSitePage from './components/intro/AboutSitePage.tsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from "react-router";
import { SolvedPuzzlesContext } from './components/common/utils.js'
import { transitionDurations, delayDurations, shape, typography } from './components/common/styles.jsx'
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: "dark"
  },
  transitions: {
    duration: transitionDurations
  },
  delays: {
    duration: delayDurations
  },
  typography,
  shape,
});

function App() {

  const [wasmExports, setWasmExports] = useState(null);
  const [solvedPuzzles, setSolvedPuzzles] = useState(new Set());
  // unused, but required by wasm binary
  const imports = {
    "wasi_snapshot_preview1": {
      "proc_exit": () => {},
      "fd_close": () => {},
      "fd_write": () => {},
      "fd_seek": () => {},
      "args_get": () => {},
      "args_sizes_get": () => {}
    }
  }

  useEffect(() => {
    init(imports).then((instance) => {
      setWasmExports(instance.exports);
  })}, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SolvedPuzzlesContext value={{solvedPuzzles, setSolvedPuzzles}}>
      <BrowserRouter>
            <Routes>
              {(wasmExports != null) && (
                <>
                  <Route path="/" element={<IntroductionPage/>} />
                  <Route path="/ratRiddle" element={<RatRiddlePage wasmExports={wasmExports} />} />
                  <Route path="/ratRiddle/breakdown" element={<RatRiddleBreakdownPage/>} />
                  <Route path="/horseRiddle" element={<HorseRiddlePage wasmExports={wasmExports} />} />
                  <Route path="/horseRiddle/breakdown" element={<HorseRiddleBreakdownPage/>} />
                  <Route path="/roosterRiddle" element={<RoosterRiddlePage wasmExports={wasmExports} />} />
                  <Route path="/roosterRiddle/breakdown" element={<RoosterRiddleBreakdownPage/>} />
                  <Route path="/about" element={<AboutSitePage/>} />
                </>
              )}
            </Routes>
      </BrowserRouter>
      </SolvedPuzzlesContext>
    </ThemeProvider>
  );
}

export default App;
