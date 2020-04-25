import os from 'os';

require('dotenv').config();

const { env } = process;
export const isDev = env.NODE_ENV !== 'production';

export const HOSTNAME = os.hostname();
export const finnHubKey = env.FINNHUB_KEY || '';

/***
 * Notebook server env
 */
export const PORT = env.PORT || 3007;
export const appName = env.APP_NAME || 'ALGO:SERVER';

/**
 * External algo server env
 */
export const algoServerHost = `http://${env.ALGO_SERVER_SERVICE_HOST || 'localhost'}`;
export const algoServerPort = env.ALGO_SERVER_SERVICE_PORT || 3001;