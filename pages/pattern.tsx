import { useApolloClient } from '@apollo/react-hooks';
import { EnterSymbolData } from 'client/components/EnterSymbol';
import { Nav } from "client/components/Nav"
import concat from 'lodash/concat';
import random from 'lodash/random';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { AlgoResults } from 'shared/graphql/algoresults.typedef';
import { RUN_PATTERN } from 'shared/graphql/query/runAlgo.query';
import { ON_ALGO_RESULTS_SUBSCRIPTION } from 'shared/graphql/subscription';
import PatternScreen from '../client/screens/PatternScreen';
import { RunAlgorithmResults } from '../server/strategy/runStrategy';

const randomNumber = () => {
  return random(1000, 100000);
}

interface State extends RunAlgorithmResults {
  startingDateRangeIndex: number;
}

const Index = () => {

  const client = useApolloClient();

  const [loading, setLoading] = useState<boolean>(false);
  const [enterSymbolData, setEnterSymbol] = useState<EnterSymbolData>({} as any);

  const { endDate, startDate, algoMode } = enterSymbolData;

  const [transId, setTransId] = useState<string>(`${randomNumber()}`);

  const [algoData, setLocalAlgoData] = useState<State>({} as any);

  const fetchRunAlgo = async (data: any) => {
    const {
      startDate,
      endDate,
      symbol,
      algoMode } = data;
    // run selectedDateRange magic then set next range
    setLoading(true);

    await client.query({
      query: RUN_PATTERN,
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

  }

  const runAlgo = (data: EnterSymbolData) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    resetAlgo();

    // Run a transaction
    setEnterSymbol(data);
    fetchRunAlgo(data);
  }

  const resetAlgo = () => {
    setLocalAlgoData({ ...algoData, startingDateRangeIndex: 0, trades: [], profit: 0, marketData: [], totalTrades: 0 });
  }

  const listenData = () => {

    const observer = client.subscribe<any, any>({
      query: ON_ALGO_RESULTS_SUBSCRIPTION,
      variables: {
        time: `${new Date().getTime()}`,
        transId: `${transId}`
      },
    })

    const subscription = observer.subscribe(({ data }) => {

      const algoResults: AlgoResults = data && data.onAlgoResults;

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

      console.log('SUBSCRIBE:DATE', { start: formatDate(startDate), end: formatDate(endDate), transId });
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
      });

      setLoading(false);

      setTransId(`${randomNumber()}`);
    })

    return () => subscription.unsubscribe()
  }

  // Subscribe to current transId
  useEffect(() => {
    return listenData();
  }, [transId]);

  return (
    <>
      <Nav loading={loading} />
      <PatternScreen stopRunning={() => { }} enterSymbolData={enterSymbolData} enterSymbol={runAlgo} data={algoData} loading={loading} />
    </>
  );
};

export default Index;