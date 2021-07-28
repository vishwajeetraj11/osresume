/* eslint-disable react/jsx-filename-extension */
import { ServerStyleSheets } from '@material-ui/core/styles';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="description" content="Description" />
          <meta name="keywords" content="Keywords" />
          <meta name="theme-color" content="#1abc9c" />
          {/* <!-- Chrome, Firefox OS and Opera --> */}
          {/* <meta name="theme-color" content="#4285f4" /> */}
          {/* <!-- Windows Phone --> */}
          <meta name="msapplication-navbutton-color" content="#1abc9c" />
          {/* <!-- iOS Safari --> */}
          <meta name="apple-mobile-web-app-status-bar-style" content="#1abc9c" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            defer
            data-name="BMC-Widget"
            data-cfasync="false"
            src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
            data-id="vishwajeetraj11"
            data-description="Support me on Buy me a coffee!"
            data-message="If you are enjoying OS Resume, consider supporting me with a coffee ☕. It would make my day :D"
            data-color="#1abc9c"
            data-position="Right"
            data-x_margin="18"
            data-y_margin="18"
          />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async ctx => {
  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () => originalRenderPage({ enhanceApp: App => props => sheets.collect(<App {...props} />) });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};
