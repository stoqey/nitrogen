export const GraphQLPath = '/graphql'
export const SERVER_URI = GraphQLPath;
export const isClient = typeof window !== 'undefined';

const AMPLITUDE_KEY = process.env.AMPLITUDE_KEY;
const SEGMENT_PROD = process.env.SEGMENT_PROD;
const SEGMENT_DEV = process.env.SEGMENT_DEV;
const SENTRY_DSN = process.env.SENTRY_DSN;
const SENTRY_ORG = process.env.SENTRY_ORG;
const SENTRY_PROJECT = process.env.SENTRY_PROJECT;

export const analyticsEnv = {
    AMPLITUDE_KEY, SEGMENT_PROD, SEGMENT_DEV, SENTRY_DSN, SENTRY_ORG, SENTRY_PROJECT
}