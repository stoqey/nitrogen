import { PubSub } from "apollo-server-express";
import chalk from "chalk";

import { APPEVENTS,AppEvents } from "../../shared/AppEvent";
import { AlgoResults } from "../../shared/graphql/algoresults.typedef";
import { delay } from "../../shared/utils/promise.utils";
import { plotGraphImageToDisk, saveTradeDataToDisk } from "../publishers/plotGraphImage";
import { sendDataToAlgoServer } from "../publishers/sendDataToAlgoServer";
import { RunAlgorithm } from "../strategy/runStrategy";

export const resolverEvents = (pubsub: PubSub) => {

    const appEvents = AppEvents.Instance;

    /**
     * Run Algorithm
     * @emits ON_ALGO_RESULTS
     */
    appEvents.on(APPEVENTS.RUN_ALGO, async (data: RunAlgorithm) => {
        return await new Promise((resolve) => {
            async function runAlgorithmWithData() {

                // Or run from here
                const results = await sendDataToAlgoServer('/algo/run', data);

                // console.log('results', results)
                const transId = results.runAlgo.transId;

                console.log(APPEVENTS.RUN_ALGO, chalk.green(`emitting to ${transId}`));

                await delay(600, "some cool value");

                // Publish results
                pubsub.publish(`${APPEVENTS.ON_ALGO_RESULTS}-${transId}`, results);

                // Save results and plot
                appEvents.emit(APPEVENTS.SAVE_ALGO_RESULTS, { transId, results });

                resolve({ done: true })
            }
            runAlgorithmWithData();
        });

    });

    // 1. SaveTradesDataToDisk
    appEvents.on(APPEVENTS.SAVE_ALGO_RESULTS, async (data: { results: AlgoResults, transId: string }) => {
        const { transId, results } = data;
        // Save data to disk
        await saveTradeDataToDisk(transId, results);

        // Plot data now
        // Save results and plot
        appEvents.emit(APPEVENTS.PLOT_ALGO_RESULTS, { transId });
    })

    // 1. PlotAlgoResults
    appEvents.on(APPEVENTS.PLOT_ALGO_RESULTS, (data: { transId: string }) => {
        const { transId } = data;
        // Plot graph here
        plotGraphImageToDisk(transId, pubsub);
    })
}