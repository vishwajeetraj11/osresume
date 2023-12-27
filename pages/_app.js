import { ClerkProvider, SignedIn, SignedOut } from '@clerk/nextjs';
import CssBaseline from '@material-ui/core/CssBaseline';
// MUI Setup
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import Loader from '../components/Loader';
import Layout from '../components/layout/Layout';
import { theme } from '../shared/theme';
import '../styles/global.css';
// Clerk Env
const clerkSignInURL = process.env.NEXT_PUBLIC_CLERK_SIGN_IN;
const publicPages = ['/', '/sign-in/[[...index]]', '/sign-up/[[...index]]'];

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = url => {
      setLoading(true);
    };
    const handleComplete = url => {
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [loading]);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />

        <Toaster richColors position="bottom-left" />
        <Head>
          <title>OS Resume</title>
        </Head>
        <ClerkProvider {...pageProps}>
          {loading ? (
            <Loader fullScreen />
          ) : (
            <Layout route={router.pathname}>
              {publicPages.includes(router.pathname) ? (
                <Component {...pageProps} />
              ) : (
                <>
                  <SignedIn>
                    <Component {...pageProps} />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              )}
            </Layout>
          )}
        </ClerkProvider>
      </StylesProvider>
    </ThemeProvider>
  );
}

function RedirectToSignIn() {
  useEffect(() => {
    window.location = clerkSignInURL;
  });
  return null;
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
