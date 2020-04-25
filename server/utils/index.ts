import moment, { Moment } from "moment";

/**
 * Check if time has ended
 * @param start 
 * @param end 
 * @param targetMinutes 
 */
export const isTimeEnded = (start: Moment, end: Moment, targetMinutes: number): boolean => {
    const duration = moment.duration(end.diff(start));
    const minutesDif = duration.asMinutes();
    return minutesDif >= targetMinutes;
}


// https://www.investopedia.com/ask/answers/how-do-you-calculate-percentage-gain-or-loss-investment/

/**
 * Get Profit percentage gained
 * @param startPrice 
 * @param endPrice 
 */
export const getPercentageGain = (startPrice: number, endPrice: number) => {
    return (endPrice - startPrice) / startPrice * 100;
}


/**
 * Get slice,
 * Analyse slices
 * Determine direction
 * Buy/Sell in that direction
 */

//  interface GetChunks {
     
//  }
//  export function get3ChunksFromHistory() {
     
//  }
