
import SentryWebpackPlugin from '@sentry/webpack-plugin';
import withSourceMaps from '@zeit/next-source-maps';
import withPlugins from 'next-compose-plugins';

require('dotenv').config();
// Use the SentryWebpack plugin to upload the source maps during build step


const { SENTRY_DSN, SENTRY_ORG, SENTRY_PROJECT, AMPLITUDE_KEY, NODE_ENV, SEGMENT_PROD, SEGMENT_DEV } = process.env;


// next.js configuration
const nextConfig = {
    env: {
        SENTRY_DSN, SENTRY_ORG, SENTRY_PROJECT, // sentry error logging
        AMPLITUDE_KEY, SEGMENT_PROD, SEGMENT_DEV, // amplitude and segment
        NODE_ENV // node env
    },

    exportPathMap: function () {
        return {
            '/': { page: '/' },
        };
    },

    webpack: (config, { isServer }) => {

        if (!isServer) {
            config.resolve.alias['@sentry/node'] = '@sentry/browser'
        }

        // When all the Sentry configuration env variables are available/configured
        // The Sentry webpack plugin gets pushed to the webpack plugins to build
        // and upload the source maps to sentry.
        // This is an alternative to manually uploading the source maps
        if (SENTRY_DSN && SENTRY_ORG && SENTRY_PROJECT) {
            config.plugins.push(
                new SentryWebpackPlugin({
                    include: '.next',
                    ignore: ['node_modules'],
                    urlPrefix: '~/_next',
                })
            )
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