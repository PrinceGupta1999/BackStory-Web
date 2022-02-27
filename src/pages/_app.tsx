import * as React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { darkTheme, lightTheme } from '../theme';
import createEmotionCache from '../components/core/createEmotionCache';
import NavBar from '../components/layout/NavBar';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import Footer from '../components/layout/Footer';
import useDarkMode from 'use-dark-mode-hook';
import '../styles/styles.css';
import { User } from '../types/auth/user';
import { useState } from 'react';
import { auth } from '../infrastructure/core/initializeFirebase';
import { getUser } from '../infrastructure/auth/authRepository';
import { userDtoConverter } from '../infrastructure/auth/userConverter';
import Head from '../components/core/Head';

TimeAgo.addDefaultLocale(en);

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export const UserContext = React.createContext<{
  user: User | undefined;
}>({
  user: undefined,
});
export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [isDarkMode, toggleDarkMode] = useDarkMode({});
  const [user, setUser] = useState<User | undefined>(undefined);
  React.useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDto = await getUser(user.uid);
        setUser(userDto ? userDtoConverter.fromDto(userDto) : undefined);
      } else {
        setUser(undefined);
      }
    });
  }, []);
  return (
    <CacheProvider value={emotionCache}>
      <Head />
      <UserContext.Provider value={{ user }}>
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          <Component {...pageProps} />
          <Footer />
        </ThemeProvider>
      </UserContext.Provider>
    </CacheProvider>
  );
}
