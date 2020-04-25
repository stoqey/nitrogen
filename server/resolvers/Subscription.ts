import { APPEVENTS } from "../../shared/AppEvent";
import { PubSub, withFilter } from "apollo-server-express";

export const SubscriptionResolver = (pubsub: PubSub) => ({
    onAlgoResults: {
        resolve: (payload: any, args: any, context: any, info: any) => payload,
        subscribe: (_: any, args: any) => {
            console.log('----------------------> subscribe', args)
            const transId = args && args.transId;
            return pubsub.asyncIterator(`${APPEVENTS.ON_ALGO_RESULTS}-${transId}`)
        },
    }
})