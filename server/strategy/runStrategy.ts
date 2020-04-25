/* eslint-disable @typescript-eslint/no-unused-vars */
import backtest, { Backtest } from '@vuga/barebone';

import { AlgoMode } from '../../interfaces/common.types';

// ## Create interfaces here
export type MarketData = Backtest.BarData[];

export type SymbolType = 'crypto' | 'stock';

// Data required to run algorithm
export interface BackTestParams {
    symbol: string;
    symbolType: SymbolType;
    marketData: MarketData,
    params: any,
    debug?: boolean;
    capital: number;
    algoMode: AlgoMode;
}


export interface RunAlgorithm {
    symbol: string;
    symbolType?: SymbolType;

    // for market data
    startDate: Date,
    endDate: Date,
    marketData?: MarketData;

    // for trading
    algoMode: AlgoMode,
    capital?: number;

    transId?: string;
    time?: string;

    isBacktesting?: boolean;

};
export interface RunAlgorithmResults extends Backtest.Context {
    marketData: MarketData;
    marketDataSnapshot: MarketData;
    runAlgo: RunAlgorithm;
};


// STRATEGY
export async function runStrategy(args: BackTestParams) {

    const { marketData, params, debug, symbolType, symbol, capital, algoMode = "BUY" } = args;

    const backTest = await backtest({
        marketData,
        options: {
            capital,
        },

        strategy: {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            analysePosition: async ({ bar, position, exitPosition }) => {

            },

            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onMarketTick: async ({ bar, enterPosition }) => {

            }
        }

    });
    return backTest;
}