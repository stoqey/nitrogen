import { PubSub } from "apollo-server-express";

import { APPEVENTS } from "../../shared/AppEvent";

export const SubscriptionResolver = (pubsub: PubSub) => ({
    onAlgoResults: {
        resolve: (payload: any) => payload,
        subscribe: (_: any, args: any) => {
            console.log('----------------------> subscribe', args)
            const transId = args && args.transId;
            return pubsub.asyncIterator(`${APPEVENTS.ON_ALGO_RESULTS}-${transId}`)
        },
    }
})