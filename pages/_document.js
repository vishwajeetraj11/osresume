/* eslint-disable react/jsx-filename-extension */
import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap" rel="stylesheet" />
          <meta name="description" content="Description" />
          <meta name="keywords" content="Keywords" />
          <meta name="theme-color" content="#1abc9c" />
          <meta name="msapplication-navbutton-color" content="#1abc9c" />
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
