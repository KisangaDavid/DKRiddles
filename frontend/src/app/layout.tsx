import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { PropsWithChildren } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './_common/theme';
import PageWrapper from "./_common/PageWrapper";
import { SolvedPuzzlesContextProvider } from "./_common/SolvedPuzzlesContextProvider";

export default function RootLayout({ children } : PropsWithChildren) {

  return (
    <html lang="en">
      <head>
        <title>The Riddle Man</title>
        <meta name="theme-color" content="#090f15" />
      </head>
      <body>
        <AppRouterCacheProvider>
          <SolvedPuzzlesContextProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <div id="root">
                <PageWrapper>
                  {children}
                </PageWrapper>
              </div>
            </ThemeProvider>
          </SolvedPuzzlesContextProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}