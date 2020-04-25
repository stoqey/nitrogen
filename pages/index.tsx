import React, { useEffect, useState } from 'react';
import concat from 'lodash/concat';
import random from 'lodash/random';
import { Nav } from "client/components/Nav"
import { AppEvents } from '../shared/AppEvent';
import { RunAlgorithmResults } from '../server/strategy/runStrategy';
import AlgoScreen from '../client/screens/AlgoScreen';
import { getSplitedTime } from 'shared/utils/time.utils';
import { useApolloClient } from '@apollo/react-hooks';
import { ON_ALGO_RESULTS_SUBSCRIPTION } from 'shared/graphql/subscription';
import { RUN_ALGO } from 'shared/graphql/query/runAlgo.query';
import { AlgoResults } from 'shared/graphql/algoresults.typedef';
import moment from 'moment';
import { EnterSymbolData } from 'client/components/EnterSymbol';


const randomNumber = () => {
  return random(1000, 100000);
}


interface ShowProps {
  shows: {
    id: number;
    name: string;
  }[];
}

interface State extends RunAlgorithmResults {
  startingDateRangeIndex: number;
}
const Index = () => {

  const client = useApolloClient();

  const [enterSymbolData, setEnterSymbol] = useState<EnterSymbolData>({} as any);

  const { symbol, endDate, startDate, algoMode } = enterSymbolData;

  const [transId, setTransId] = useState<string>(`${randomNumber()}`);

  const splittedTime = getSplitedTime(startDate, endDate);

  const totalDays = splittedTime.totalDays;

  const dateRanges = splittedTime.items || [];

  const [algoData, setLocalAlgoData] = useState<State>({ startingDateRangeIndex: -1 } as any);

  const startingDateRangeIndex = algoData && algoData.startingDateRangeIndex;

  const selectedDateRange = dateRanges && dateRanges[startingDateRangeIndex];

  const setStartingDateRangeIndex = (rangeIndex: number) => {
    setLocalAlgoData({
      ...algoData,
      startingDateRangeIndex: rangeIndex,
    })
  };

  const currentStart = selectedDateRange && selectedDateRange.startDate;


  const stopRunningAlgo = () => {
    setStartingDateRangeIndex(-1);
  }

  const runAlgo = (data: EnterSymbolData) => {

    setTransId(`${randomNumber()}`);

    // Run a transaction
    setEnterSymbol(data);

    resetAlgo();
  }

  const resetAlgo = () => {
    setLocalAlgoData({ ...algoData, startingDateRangeIndex: 0, trades: [], profit: 0, marketData: [], totalTrades: 0 });
  }

  // Subscribe to current transId
  useEffect(() => {
    const observer = client.subscribe<any, any>({
      query: ON_ALGO_RESULTS_SUBSCRIPTION,
      variables: {
        time: `${new Date().getTime()}`,
        transId: `${transId}`
      },
    })

    const subscription = observer.subscribe(({ data }) => {

      const algoResults: AlgoResults = data && data.onAlgoResults;

      const { startDate = "n/a", endDate = "n/a" } = selectedDateRange || {};

      const {
        profit: newProfit = 0,
        marketData: newMarketData = [],
        marketDataSnapshot: newMarketDataSnapshot = [],
        trades: newTrades = [],
        totalTrades: newTotalTrades = 0,
      } = algoResults; // From algo results

      const {
        profit: profitOG = 0,
        marketData: marketDataOg = [],
        marketDataSnapshot: marketDataSnapshotOg = [],
        trades: tradesOg = [],
        totalTrades: totalTradesOg = 0

      } = algoData || {}; // from localState


      const formatDate = (d: any): string => {
        return moment(d).format('MM-DD-YYYY')
      }
      console.log('SUBSCRIBE:DATE', { start: formatDate(startDate), end: formatDate(endDate) });
      console.log('----------------', { newTotalTrades, profitOG, newProfit, algoMode });
      // console.log('SUBSCRIBE:TRADES', { newTotalTrades, profitOG, newProfit });

      setLocalAlgoData({
        // Existing algo
        ...algoData,
        profit: profitOG + newProfit,
        marketData: concat(marketDataOg, newMarketData),
        marketDataSnapshot: concat(marketDataSnapshotOg, newMarketDataSnapshot),
        trades: concat(tradesOg, newTrades),
        totalTrades: totalTradesOg + newTotalTrades,
        capital: 0, // TODO capital
        startingDateRangeIndex: startingDateRangeIndex + 1
      });
    })

    return () => subscription.unsubscribe()
  }, [algoData])


  // Query data
  useEffect(() => {

    // run selectedDateRange magic then set next range
    async function runApi() {

      const { startDate, endDate } = selectedDateRange;

      await client.query({
        query: RUN_ALGO,
        variables: {
          input: {
            startDate,
            endDate,
            symbol,
            algoMode,
            transId: `${transId}`
          }
        }
      });

    };


    if (currentStart) {
      runApi()
    }
  }, [algoData]);

  const isRunning = !!selectedDateRange;

  return (
    <>
      <Nav loading={isRunning} />
      <AlgoScreen enterSymbolData={enterSymbolData} totalDays={totalDays} transId={transId} enterSymbol={runAlgo} data={algoData} stopRunning={stopRunningAlgo} loading={isRunning} />
    </>
  );
};

export default Index;
