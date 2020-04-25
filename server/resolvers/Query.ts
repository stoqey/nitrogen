import isEmpty from "lodash/isEmpty";

import { RunAlgorithm } from "../../server/strategy/runStrategy";
import { APPEVENTS, AppEvents } from "../../shared/AppEvent";

export const QueryResolver = {
    runAlgo: (_: any, args: any): boolean => {
        const input: RunAlgorithm = args && args.input;
        // console.log('args to runAlgo', input);
        if (!isEmpty(input)) {
            AppEvents.Instance.emit(APPEVENTS.RUN_ALGO, input);
            return true;
        }
        return false;
    }
}