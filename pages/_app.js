import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';
import CssBaseline from '@material-ui/core/CssBaseline';
// MUI Setup
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SnackbarProvider } from 'notistack';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import 'tailwindcss/tailwind.css';
import Layout from '../components/layout/Layout';
import Loader from '../components/Loader';
import { useStore } from '../redux/store';
import { theme } from '../shared/theme';
import '../styles/globals.scss';
// Clerk Env
const clerkSignInURL = process.env.NEXT_PUBLIC_CLERK_SIGN_IN;
const publicPages = ['/', '/sign-in/[[...index]]', '/sign-up/[[...index]]'];

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
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
    <Provider store={store}>
      <SnackbarProvider classes={{ variantSuccess: 'nackbarItem-variantSuccess-99', anchorOriginBottomLeft: 'mt-2' }} maxSnack={3}>
        <ThemeProvider theme={theme}>
          <StylesProvider injectFirst>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Head>
              <title>OS Resume</title>
            </Head>
            <ClerkProvider frontendApi={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API} navigate={to => router.push(to)}>
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
      </SnackbarProvider>
    </Provider>
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
