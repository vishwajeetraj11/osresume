import { ClerkProvider, RedirectToSignIn, Show } from '@clerk/nextjs';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import Loader from '../components/Loader';
import Layout from '../components/layout/Layout';
import '../styles/global.css';

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

  return (
    <>
      <Toaster
        closeButton
        position="bottom-left"
        toastOptions={{
          style: { fontFamily: "'Space Grotesk', sans-serif" },
        }}
      />
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
                <Show when="signed-in">
                  <Component {...pageProps} />
                </Show>
                <Show when="signed-out">
                  <RedirectToSignIn />
                </Show>
              </>
            )}
          </Layout>
        )}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER} />
      </ClerkProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
