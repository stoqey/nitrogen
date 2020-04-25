import { AppEvents, APPEVENTS } from "../../shared/AppEvent";
import { RunAlgorithm } from "../../server/strategy/runStrategy";
import isEmpty from "lodash/isEmpty";

export const QueryResolver = {
    runAlgo: (_: any, args: any, ctx: any): boolean => {
        const input: RunAlgorithm = args && args.input;
        // console.log('args to runAlgo', input);
        if (!isEmpty(input)) {
            AppEvents.Instance.emit(APPEVENTS.RUN_ALGO, input);
            return true;
        }
        return false;
    }
}