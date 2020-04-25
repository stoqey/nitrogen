import { AlgoMode } from '../../interfaces/common.types';
import { LocalStorageUtility } from './localStorage.util';
interface State {
    endDate: Date;
    startDate: Date;
    symbol: string;
    algoMode: AlgoMode;
};

export class ClientDB {

    public dbName = 'client'
    // public endDate: Date = new Date();
    // public startDate: Date = new Date();
    // public symbol: string = "";

    public localStorage = new LocalStorageUtility()

    private static _instance: ClientDB;

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    /**
     * getState
     */
    public getState(): State {
        // Save state
        return {
            ...this.localStorage.getItem(this.dbName),
        }
    }

    /**
     * setState
     */
    public setState(state: State) {
        // Save state
        this.localStorage.saveItem(this.dbName, state);
    }

}