// Import used css
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
// Spinner
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import * as Sentry from '@sentry/node'
import { RootAppWithApollo } from 'client/hoc/RootAppWithApollo';
import { theme } from 'client/theme';
import { GlobalStyle } from 'client/theme/global.style';
import App from 'next/app';
import React from 'react';
import { SENTRY_DSN } from 'shared/config';
import { ThemeProvider } from 'theme-ui'

const sentryConfig = {
  enabled: process.env.NODE_ENV === 'production',
  dsn: SENTRY_DSN,
};

Sentry.init(sentryConfig)


class CustomApp extends App<any, any> {
  render() {
    // Workaround for https://github.com/zeit/next.js/issues/8592
    const { err, pageProps, Component } = this.props;

    const modifiedPageProps = { ...pageProps, err }

    const ComponentWithApollo = RootAppWithApollo(Component);
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ComponentWithApollo {...modifiedPageProps} />
      </ThemeProvider>
    );
  }
}

export default CustomApp;
