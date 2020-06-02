import isEmpty from 'lodash/isEmpty';
import React from 'react';
import { Box } from 'rebass';

import { RunAlgorithmResults } from '../../server/strategy/runStrategy';
import { EnterSymbol, EnterSymbolData } from '../components/EnterSymbol';
import Graph from './Graph';
import GraphBar from './GraphBar';


interface Props {
  data: RunAlgorithmResults;
  loading: boolean;
  stopRunning: () => void;
  enterSymbol: (data: EnterSymbolData) => void;
  enterSymbolData: EnterSymbolData;
}

const PatternScreen = (props: Props) => {

  const { loading, stopRunning, enterSymbol } = props;

  const marketData = props.data && props.data.marketData || [];
  const trades = props.data && props.data.trades || [];

  const GraphComponent = () => {
    if (isEmpty(marketData)) {
      return null;
    }


    const marketDataSerie = marketData.map(md => {
      return { x: new Date(md.date).getTime(), y: +md.close }
    });

    const marketDataSerieNull = marketData.map(md => {
      return { x: new Date(md.date).getTime(), y: 0 }
    });

    const tradesSeries = trades.map(md => {
      const { entryTime, exitTime = new Date() } = md;
      return { x: new Date(entryTime).getTime(), y: +md.profitAmount, t: md.tradeType, exitTime: new Date(exitTime), entryTime: new Date(entryTime) }
    });

    const tradesWithMarketData = [marketDataSerieNull[0], ...tradesSeries, marketDataSerieNull[marketDataSerieNull.length - 1]];

    return (
      <>

        <Graph dataSeries={
          {
            label: 'MarketData',
            datums: marketDataSerie
          }
        } />

        <GraphBar dataSeries={
          {
            label: 'MarketData',
            datums: tradesWithMarketData
          }
        } />

        {/* All trades */}
        {/* <TradeDataCharts dataSeries={tradesWithMarketData} /> */}

        {/* market data */}
        {/* <MarketDataChart dataSeries={marketDataSerie} /> */}

      </>
    )

  }

  return (
    <>
      {/* Details and form */}
      <Box
        sx={{
          display: 'grid',
          // gridGap: 4,
          gridTemplateColumns: 'repeat(auto-fit, minmax(128px, 1fr))',
        }}>

        <Box p={3}>
          <EnterSymbol enterSymbol={enterSymbol} stopRunning={stopRunning} loading={loading} />
        </Box>
      </Box>

      {/* Detailed Chart or server side chart */}
      <GraphComponent />
    </>
  )
};

PatternScreen.getInitialProps = async function () {
  // const res = await fetch(`${SERVER_URI}/algo`, { method: 'POST' });
  // const data = await res.json();
  // return { data };
  return {}
};

export default PatternScreen;
