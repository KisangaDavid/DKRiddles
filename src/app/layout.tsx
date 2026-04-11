'use client'

import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { useState, useEffect, PropsWithChildren } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './_common/theme';
import PageWrapper from "./_common/PageWrapper";
import { SolvedPuzzlesContext } from "./_common/utils";
import { ALL_PUZZLES } from "./_common/constants";

export default function RootLayout({ children } : PropsWithChildren) {
  const [solvedPuzzles, setSolvedPuzzles] = useState<Set<string>>(new Set());

  useEffect(() => {
    const newSolvedPuzzles = new Set<string>();
    ALL_PUZZLES.forEach((element) => {
      if(localStorage.getItem(element) != null) {
        newSolvedPuzzles.add(element)
      }
    });
    setSolvedPuzzles(newSolvedPuzzles);
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
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <div id="root">
                <PageWrapper>
                  {children}
                </PageWrapper>
              </div>
            </ThemeProvider>
          </SolvedPuzzlesContext>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}