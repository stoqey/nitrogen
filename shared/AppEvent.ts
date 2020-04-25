import EventEmitter from 'events';

export enum APPEVENTS {

    RUN_ALGO = 'run_algo',

    /**
     * { trades: Position[]; capital: number; profit?: number; totalTrades?: number; }
     */
    ON_ALGO_RESULTS = 'on_algo_results',
    SAVE_ALGO_RESULTS = 'save_algo_results',

    PLOT_ALGO_RESULTS = 'plot_algo_results',
    ON_PLOT_ALGO_RESULTS = 'on_plot_algo_results', // after graph has been plotted

}

export class AppEvents extends EventEmitter.EventEmitter {
    private static _instance: AppEvents;

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    private constructor() {
        super();
        // this.setMaxListeners(100); // set a maximum of 50 event listners
    }

}

