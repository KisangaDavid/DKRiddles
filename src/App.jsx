import { useState, useEffect } from "react";
import init from '/src/wasm/allModules.wasm?init'
import RatRiddlePage from './components/ratRiddle/RatRiddlePage.jsx';
import HorseRiddlePage from './components/horseRiddle/HorseRiddlePage.jsx';
import RoosterRiddlePage from './components/roosterRiddle/RoosterRiddlePage.jsx';
import IntroductionPage from './components/intro/IntroductionPage.jsx';
import AboutSitePage from './components/intro/AboutSitePage.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from "react-router";
import { styleOverrides } from './components/common/styleOverrides.js';
import { typography, shadows, shape } from '/src/components/common/themePrimitives';
import './App.css';
import { CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark"
  },
  cssVariables: {
    colorSchemeSelector: 'data-mui-color-scheme',
    cssVarPrefix: 'template',
  },
  transitions: {
    duration: {
      standardTextFade: 1000,
      shortImageZoom: 500,
      shortImageFade: 750,
      standardImageFade: 1500,
      longTextFade: 2000
    }
  },
  delays: {
    duration: {
      shortDelay: 200,
      standardDelay: 250,
      longDelay: 500,
      extraLongDelay: 750
    }
  },
  typography,
  shadows,
  shape,
  components: {
    ...styleOverrides,
  },
});

function App() {

  const [wasmModule, setWasmModule] = useState(null);

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
      setWasmModule(instance);
  })}, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {(wasmModule != null) && (
            <>
              <Route path="/" element={<IntroductionPage/>} />
              <Route path="/ratRiddle" element={<RatRiddlePage wasmModule={wasmModule} />} />
              <Route path="/horseRiddle" element={<HorseRiddlePage wasmModule={wasmModule} />} />
              <Route path="/roosterRiddle" element={<RoosterRiddlePage wasmModule={wasmModule} />} />
              <Route path="/about" element={<AboutSitePage/>} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
