import { TradeType } from '../../interfaces/common.types';

export const getProfitColor = (tradeType: TradeType): string => {
    if (tradeType === undefined) return 'grey';
    return tradeType === 'BUY' ? '#3edd95' : '#f22233'
};

export const getColorByProfit = (profit: number): string => {
    if (isNaN(profit) || profit === 0) return 'grey';
    return profit > 0 ? '#3edd95' : '#f22233'
};

// #3bcb8a