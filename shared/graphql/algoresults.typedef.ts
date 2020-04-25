import { Backtest } from "@vuga/barebone";
import gql from 'graphql-tag';

import { RunAlgorithm } from "../../server/strategy/runStrategy";

export interface AlgoResults {
  marketData: Backtest.BarData[];
  marketDataSnapshot: Backtest.BarData[];
  runAlgo: RunAlgorithm;
  trades: Backtest.Position[];
  capital: number;
  profit: number;
  totalTrades: number;
};

export const AlgoResultsFragment = gql`
    fragment AlgoResultsFragment on AlgoResults {
          marketData {
            close
            date
            volume
          }
          marketDataSnapshot {
            close
            date
            volume
          }
          runAlgo {
            startDate 
            endDate 
            symbol 
            algoMode
            transId 
          }
          trades {
            tradeType
            entryTime
            exitTime
            entryPrice
            profit
            profitAmount
            profitPct
          }
          totalTrades
          profit
          totalTrades
        }
`;

/**
 * AlgoResults type def
 */
export default gql`

  type Trade {
    tradeType: String
    entryTime: String
    exitTime: String
    entryPrice: Float
    profit: Float
    profitAmount: Float
    profitPct: Float
  }

  type Bar {
    date: String
    close: Float
    volume: Float
  }

  type AlgoResults {
    marketData: [Bar]
    marketDataSnapshot: [Bar]
    trades: [Trade]
    capital: Int
    profit: Float
    totalTrades: Int
    runAlgo: RunAlgo
  }

  input inputRunAlgo {
    startDate: String
    endDate: String
    symbol: String
    algoMode: String
    transId: String
    time: String
  }

  type RunAlgo {
    startDate: String
    endDate: String
    symbol: String
    algoMode: String
    transId: String
    time: String
  }
 
`;