export const GraphQLPath = '/graphql'
export const SERVER_URI = GraphQLPath;
export const isClient = typeof window !== 'undefined';
export const AMPLITUDE_KEY = process.env.AMPLITUDE_KEY;
export const SEGMENT_PROD = process.env.SEGMENT_PROD;
export const SEGMENT_DEV = process.env.SEGMENT_DEV;
export const SENTRY_DSN = process.env.SENTRY_DSN;
export const SENTRY_ORG = process.env.SENTRY_ORG;
export const SENTRY_PROJECT = process.env.SENTRY_PROJECT;