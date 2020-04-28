import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

export class CustomDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
          />
          <meta name="theme-color" content="#FC5D64" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />

          <link rel="shortcut icon" href={("assets/favicon.ico")} type="image/x-icon" />
          <link rel="icon" href={("assets/favicon.ico")} type="image/x-icon" />
          <link rel="apple-touch-icon" sizes="57x57" href={("assets/apple-icon-57x57.png")} />
          <link rel="apple-touch-icon" sizes="60x60" href={("assets/apple-icon-60x60.png")} />
          <link rel="apple-touch-icon" sizes="72x72" href={("assets/apple-icon-72x72.png")} />
          <link rel="apple-touch-icon" sizes="76x76" href={("assets/apple-icon-76x76.png")} />
          <link rel="apple-touch-icon" sizes="114x114" href={("assets/apple-icon-114x114.png")} />
          <link rel="apple-touch-icon" sizes="120x120" href={("assets/apple-icon-120x120.png")} />
          <link rel="apple-touch-icon" sizes="144x144" href={("assets/apple-icon-144x144.png")} />
          <link rel="apple-touch-icon" sizes="152x152" href={("assets/apple-icon-152x152.png")} />
          <link rel="apple-touch-icon" sizes="180x180" href={("assets/apple-icon-180x180.png")} />
          <link rel="icon" type="image/png" sizes="192x192" href={("assets/android-icon-192x192.png")} />
          <link rel="icon" type="image/png" sizes="32x32" href={("assets/favicon-32x32.png")} />
          <link rel="icon" type="image/png" sizes="96x96" href={("assets/favicon-96x96.png")} />
          <link rel="icon" type="image/png" sizes="16x16" href={("assets/favicon-16x16.png")} />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* Should Remove It From Here . (Dynamic Import) */}
        </body>
      </html>
    );
  }
}


CustomDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collectStyles(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};

export default CustomDocument;
