/* eslint-disable @typescript-eslint/no-var-requires */

const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const withSourceMaps = require('@zeit/next-source-maps');
const withPlugins = require('next-compose-plugins');

if (!process.env.SENTRY_DSN) { // Only if envs empty
    require('dotenv').config();
}

if (!process.env.SENTRY_DSN) { // Only if envs empty
    console.log('error env', process.env);
    process.exit(1);
}

// Use the SentryWebpack plugin to upload the source maps during build step


const { SENTRY_DSN, SENTRY_ORG, SENTRY_PROJECT, AMPLITUDE_KEY, SEGMENT_PROD, SEGMENT_DEV, NODE_ENV } = process.env;

const publicEnvs = {
    SENTRY_DSN, SENTRY_ORG, SENTRY_PROJECT, // sentry error logging
    AMPLITUDE_KEY, SEGMENT_PROD, SEGMENT_DEV, // amplitude and segment 
}

// next.js configuration
const nextConfig = {

    publicRuntimeConfig: publicEnvs,

    env: publicEnvs,

    exportPathMap: function () {
        return {
            '/': { page: '/' },
        };
    },

    webpack: (config, { isServer }) => {

        if (!isServer) {
            config.resolve.alias['@sentry/node'] = '@sentry/browser'
        }

        // ESlint plugin
        config.module.rules.push(
            {
                test: /\.js$/,
                enforce: 'pre',
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
        );

        // When all the Sentry configuration env variables are available/configured
        // The Sentry webpack plugin gets pushed to the webpack plugins to build
        // and upload the source maps to sentry.
        // This is an alternative to manually uploading the source maps
        if (SENTRY_DSN && SENTRY_ORG && SENTRY_PROJECT) {

            // Do not upload source map on dev
            if (NODE_ENV != 'development') {
                config.plugins.push(
                    new SentryWebpackPlugin({
                        include: '.next',
                        ignore: ['node_modules'],
                        urlPrefix: '~/_next',
                    })
                )
            }

        }

        return config;
    },
};

module.exports = withPlugins(
    [
        withSourceMaps,
    ],
    nextConfig
);