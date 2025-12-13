'use client'

import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { useState, useEffect, PropsWithChildren } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './_common/theme';
import PageWrapper from "./_common/PageWrapper";
import { SolvedPuzzlesContext, WasmContext, ALL_PUZZLES } from "./_common/utils";

export default function RootLayout({ children } : PropsWithChildren) {
  const [wasmExports, setWasmExports] = useState<WebAssembly.Exports | null>(null);
  const [solvedPuzzles, setSolvedPuzzles] = useState<Set<string>>(new Set());

  // Not used but required by the WASM binary
  const wasmImports = {
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
    const newSolvedPuzzles = new Set<string>();
    ALL_PUZZLES.forEach((element) => {
      if(localStorage.getItem(element) != null) {
        newSolvedPuzzles.add(element)
      }
    });
    setSolvedPuzzles(newSolvedPuzzles);
    fetch("/allModules.wasm")
      .then((response) => response.arrayBuffer())
      .then((bytes) => WebAssembly.instantiate(bytes, wasmImports))
      .then((module) => {
          setWasmExports(module.instance.exports);
        });
  }, []); 

  return (
    <html lang="en">
      <head>
        <title>The Riddle Man</title>
        <meta name="theme-color" content="#090f15" />
      </head>
      <body>
        <AppRouterCacheProvider>
          <SolvedPuzzlesContext value={{solvedPuzzles, setSolvedPuzzles}}>
            <WasmContext value={{wasmExports}}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <div id="root">
                <PageWrapper>
                  {children}
                </PageWrapper>
              </div>
            </ThemeProvider>
            </WasmContext>
          </SolvedPuzzlesContext>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}