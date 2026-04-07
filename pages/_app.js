import { ClerkProvider, RedirectToSignIn, Show } from '@clerk/nextjs';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import Loader from '../components/Loader';
import Layout from '../components/layout/Layout';
import { getCanonicalUrl, getSocialImageUrl } from '../shared/utils/siteMeta';
import '../styles/global.css';

const publicPages = ['/', '/sign-in/[[...index]]', '/sign-up/[[...index]]'];
const indexableRoutes = ['/'];
const defaultDescription = 'Build a professional ATS-friendly resume for free with OS Resume. Pick a template, customize it fast, and export a polished resume in minutes.';
const defaultSocialTitle = 'OS Resume: Free ATS-Friendly Resume Builder';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const robotsContent = indexableRoutes.includes(router.pathname) ? 'index, follow' : 'noindex, nofollow';
  const canonicalUrl = getCanonicalUrl(router.asPath || '/');
  const socialImageUrl = getSocialImageUrl('/og-image.jpg');

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
        <title key="title">OS Resume</title>
        <meta key="description" name="description" content={defaultDescription} />
        <meta key="robots" name="robots" content={robotsContent} />
        <link key="canonical" rel="canonical" href={canonicalUrl} />
        <meta key="og:title" property="og:title" content={defaultSocialTitle} />
        <meta key="og:description" property="og:description" content={defaultDescription} />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:site_name" property="og:site_name" content="OS Resume" />
        <meta key="og:url" property="og:url" content={canonicalUrl} />
        <meta key="og:image" property="og:image" content={socialImageUrl} />
        <meta key="og:image:width" property="og:image:width" content="1200" />
        <meta key="og:image:height" property="og:image:height" content="630" />
        <meta key="og:image:alt" property="og:image:alt" content="OS Resume social preview image" />
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta key="twitter:title" name="twitter:title" content={defaultSocialTitle} />
        <meta key="twitter:description" name="twitter:description" content={defaultDescription} />
        <meta key="twitter:image" name="twitter:image" content={socialImageUrl} />
        <link key="icon" rel="icon" href="/favicon.ico" />
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
