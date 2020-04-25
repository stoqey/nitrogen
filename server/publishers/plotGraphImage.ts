import plot from '@stoqey/gnuplot';
import path from 'path';
import fs from 'fs';
import concat from 'lodash/concat';
import { exec, execSync } from 'child_process';
import { AlgoResults } from '../../shared/graphql/algoresults.typedef';
import JSONDATA from '../../shared/utils/text.utils';
import { PubSub } from 'apollo-server-express';

import { swallowPromise } from '../../shared/utils/promise.utils';
import { theme } from '../../client/theme';
/**
 * Get results
 * Check if exists in-memory
 * Save with new data
 * Plot graph to temp
 * Server file from temp
 */

export const plotGraphImageToDisk = async (transId: string, pubsub?: PubSub): Promise<boolean> => {
    const pathFile = `${__dirname}/../../public/${transId}`;
    const filenameJson = path.resolve(`${pathFile}.json`);

    // 00 Check if data exist
    if (!fs.existsSync(filenameJson)) {
        return false;
    }

    // Get data
    const algoResults: AlgoResults = JSONDATA(fs.readFileSync(filenameJson).toString() || {}) as AlgoResults;

    // Plot data
    console.log('algo results are', algoResults && algoResults.totalTrades)
    const allTrades = algoResults && algoResults.trades || [];
    const marketData = algoResults && algoResults.marketData || [];

    /**
     * Two files market and trades
     * - Create 2 sub dumb files from OG files for writting
     * - After writing is complete replace OG file
     */
    const filenameImgMarket = path.resolve(`${pathFile}-market.jpg`);
    const filenameImgMarketDump = path.resolve(`${pathFile}-market-${marketData.length}.jpg`);
    const filenameImgTrades = path.resolve(`${pathFile}-trades.jpg`);
    const filenameImgTradesDump = path.resolve(`${pathFile}-trades-${allTrades.length}.jpg`);

    console.log('filename', { filenameImgTrades, filenameJson, filenameImgMarket })

    const tradesSeries = {} as any;
    // const tradesWithMarketData = [marketDataSerieNull[0], ...tradesSeries, marketDataSerieNull[marketDataSerieNull.length - 1]];

    // Add first market data item to match start time
    const firstMarketData = marketData[0];
    const firstMarketDataEntryDate = new Date(firstMarketData.date).getTime() / 1000;
    tradesSeries[firstMarketDataEntryDate] = 0;

    allTrades.forEach((v) => {
        const currentData = new Date(v.entryTime).getTime() / 1000;
        if (!isNaN(currentData)) {
            tradesSeries[+currentData] = v.profit;
        }
    });

    // Add last market data item to match start time
    const lastMarketData = marketData[marketData.length - 1];
    const lastMarketDataEntryDate = new Date(lastMarketData.date).getTime() / 1000;
    tradesSeries[lastMarketDataEntryDate] = lastMarketData.close;

    const marketDataSeries: any = {};
    marketData.forEach((v) => {
        const currentData = new Date(v.date).getTime() / 1000;
        if (!isNaN(currentData)) {
            marketDataSeries[+currentData] = v.close;
        }
    });


    // 0. Create file in folder
    execSync(`touch ${filenameImgMarket}`)
    execSync(`touch ${filenameImgMarketDump}`)

    execSync(`touch ${filenameImgTrades}`)
    execSync(`touch ${filenameImgTradesDump}`)

    const graphSize = {
        width: 1400,
        height: 400
    };

    const replaceGraphs = async (oldPath: string, newPath: string): Promise<any> => {



        // Remove trades
        await swallowPromise(() => new Promise((resolve) => {

            if (fs.existsSync(oldPath)) {
                execSync(`rm -rf ${oldPath} || true`);
            }
            resolve(true);
        }));// delete old file

        // Re-create file
        execSync(`touch ${oldPath}`);
        await swallowPromise(() => new Promise((resolve) => {
            if (fs.existsSync(newPath)) {
                execSync(`mv ${newPath} ${oldPath}`);
            }
            resolve(true);
        }));// delete old file

        return null;
    }

    // 1. Plot trades
    await plot({
        data: {
            trades: tradesSeries
        },
        time: 'hours',
        filename: filenameImgTradesDump,
        format: 'jpg',
        ...graphSize,
        style: `boxes lc rgb "${theme.colors.primary}"`,
        args: ['set boxwidth 0.5', 'set style fill solid', 'set xzeroaxis lt -1']
    });

    await replaceGraphs(filenameImgTrades, filenameImgTradesDump);
    // pubsub.publish(`${APPEVENTS.ON_PLOT_ALGO_RESULTS}-${transId}`, { trades: true });


    //  2. Plot market data
    await plot({
        data: {
            'marketData': marketDataSeries,
        },
        time: 'hours',
        filename: filenameImgMarketDump,
        format: 'jpg',
        style: `lines lc rgb "${theme.colors.primary}"`,
        ...graphSize,
    });

    await replaceGraphs(filenameImgMarket, filenameImgMarketDump);
    // pubsub.publish(`${APPEVENTS.ON_PLOT_ALGO_RESULTS}-${transId}`, { marketData: true });


    return true;
}

export const saveTradeDataToDisk = async (transId: string, data: AlgoResults) => {
    const filename = path.resolve(`${__dirname}/../../public/${transId}.json`);
    //  1. Check if exist,
    //  2. Mutate or create new
    // return state 

    let existingData: AlgoResults = {} as any;
    if (fs.existsSync(filename)) {
        existingData = JSONDATA(await fs.readFileSync(filename).toString()) as any;
    };

    const {
        profit: newProfit = 0,
        marketData: newMarketData = [],
        marketDataSnapshot: newMarketDataSnapshot = [],
        trades: newTrades = [],
        totalTrades: newTotalTrades = 0,
    } = data; // From algo results

    const {
        profit: profitOG = 0,
        marketData: marketDataOg = [],
        marketDataSnapshot: marketDataSnapshotOg = [],
        trades: tradesOg = [],
        totalTrades: totalTradesOg = 0
    } = existingData; // from localState

    console.log('saveTradeDataToDisk----------------', { filename, profitOG, newProfit });

    const algoDataToSave = {
        // Existing algo
        ...existingData,
        profit: profitOG + newProfit,
        marketData: concat(marketDataOg, newMarketData),
        marketDataSnapshot: concat(marketDataSnapshotOg, newMarketDataSnapshot),
        trades: concat(tradesOg, newTrades),
        totalTrades: totalTradesOg + newTotalTrades
    };

    execSync(`touch ${filename}`);
    fs.writeFileSync(filename, JSON.stringify(algoDataToSave));




}

