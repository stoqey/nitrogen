export type TradeType = 'BUY' | 'SELL';
export type AlgoMode = TradeType | 'ALL'
export type Prediction = AlgoMode;
export interface Datum {
    x: Date | number;
    y: number;
    r?: number;
}
export interface DataSeries {
    label: string;
    datums: Datum[] | any[]
}

export interface Props {
    dataSeries: DataSeries[]
}

