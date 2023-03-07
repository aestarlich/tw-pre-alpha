import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { UiProvider } from '../../context';
import { darkTheme, lightTheme } from '../themes';
import { RoutineProvider } from '../../context/routine';
import { WorkoutProvider } from '../../context/workout';
import { AuthProvider } from '../../context/auth';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

interface CustomProps {
  session: Session;
}

function MyApp({ Component, pageProps, session }: AppProps & CustomProps) {
  return (
    <SessionProvider session={session}>
      <SWRConfig
        value={{
          refreshInterval: 86400
        }}
      >
        <AuthProvider>
          <UiProvider>
            <RoutineProvider>
              <WorkoutProvider>
                <ThemeProvider theme={darkTheme}>
                  <CssBaseline />
                  <Component {...pageProps} />
                </ThemeProvider>
              </WorkoutProvider>
            </RoutineProvider>
          </UiProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  );
}

export default MyApp;