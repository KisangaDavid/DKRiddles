import { useState, useEffect } from "react";
import init from '/src/wasm/allModules.wasm?init'
import RatRiddlePage from './components/ratRiddle/RatRiddlePage.jsx';
import HorseRiddlePage from './components/horseRiddle/HorseRiddlePage.jsx';
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
          delays: {
            duration: {
              standardDelay: 250,
              longDelay: 500
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

  const [wasmModule, setWasmModule] = useState(null);
  // unused, but required by wasm binary
  const imports = {
    "wasi_snapshot_preview1": {
      "proc_exit": () => {},
      "fd_close": () => {},
      "fd_write": () => {},
      "fd_seek": () => {}
    }
  }

    useEffect(() => {
      init(imports).then((instance) => {
        setWasmModule(instance);
    })}, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {(wasmModule != null) && (
            <>
              <Route path="/" element={<IntroductionPage/>} />
              <Route path="/ratRiddle" element={<RatRiddlePage wasmModule={wasmModule} />} />
              <Route path="/horseRiddle" element={<HorseRiddlePage wasmModule={wasmModule} />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
