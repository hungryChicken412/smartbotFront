import type { ReactElement, ReactNode } from 'react';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import ThemeProvider from 'src/theme/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from 'src/createEmotionCache';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { customHelpers } from '../helpers/custom-helpers';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AppDashboardWrapper } from 'src/contexts/global_context';

const clientSideEmotionCache = createEmotionCache();
import './index.css';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface TokyoAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

function TokyoApp(props: TokyoAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();

  Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on('routeChangeError', nProgress.done);
  Router.events.on('routeChangeComplete', nProgress.done);

  useEffect(() => {
    var [isAuthenticated, _cookie] = customHelpers.checkAuth();

    if (
      router.asPath != '/' &&
      router.asPath != '/auth/login' &&
      router.asPath != '/auth/register' &&
      router.asPath != '/blogs'
    ) {
      if (!isAuthenticated) {
        router.push('/auth/login');
      } else {
        //pass;
      }
    } else if (
      router.asPath == '/auth/login' ||
      router.asPath == '/auth/register'
    ) {
      if (isAuthenticated) {
        router.push('/dashboards');
        console.log('biujkb');
      }
    }
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>OrangeWavesAI | Customer Service Chatbots Made Easier!</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="description"
          content="OrangewavesAI is a no-code chatbot development platform for small businesses and startups, it provides one stop solution for all your needs from helpdesk issues, to surveys or a virtual assistent."
        />
        <meta
          name="og:title"
          content="OrangeWavesAI | A no-code chatbot development platform"
        />
        <meta
          name="og:description"
          content="OrangewavesAI is a no-code chatbot development platform for small businesses and startups, it provides one stop solution for all your needs from helpdesk issues, to surveys or a virtual assistent."
        />
        <meta name="og:image" content="/1876.webp" />
      </Head>
      <SidebarProvider>
        <AppDashboardWrapper>
          <ThemeProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <CssBaseline />
              {getLayout(<Component {...pageProps} />)}
            </LocalizationProvider>
          </ThemeProvider>
        </AppDashboardWrapper>
      </SidebarProvider>
      <ToastContainer position="top-right" closeOnClick />
    </CacheProvider>
  );
}

export default TokyoApp;
