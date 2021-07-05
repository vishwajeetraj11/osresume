import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';
import CssBaseline from '@material-ui/core/CssBaseline';
// MUI Setup
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import 'tailwindcss/tailwind.css';
import Layout from '../components/layout/Layout';
import { useStore } from '../redux/store';
import { theme } from '../shared/theme';
import '../styles/globals.scss';

// Clerk Env
const clerkSignInURL = process.env.NEXT_PUBLIC_CLERK_SIGN_IN;
const publicPages = ['/', '/sign-in/[[...index]]', '/sign-up/[[...index]]'];

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const router = useRouter();

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Head>
            <title>OS Resume</title>
          </Head>
          <ClerkProvider frontendApi={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API} navigate={to => router.push(to)}>
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
          </ClerkProvider>
        </StylesProvider>
      </ThemeProvider>
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
