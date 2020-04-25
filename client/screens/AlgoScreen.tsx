import React, { useEffect, useState } from 'react';
import Graph from './Graph';
import GraphBar from './GraphBar';
import GraphLine from './GraphLine';
import styled from 'styled-components';
import { Box, Heading, Image } from 'rebass';
import { RunAlgorithmResults } from '../../server/strategy/runStrategy';
import isEmpty from 'lodash/isEmpty';
import { EnterSymbol, EnterSymbolData } from '../components/EnterSymbol';
import { segmentTrack } from '../utils/analytics';
import { APPEVENTS } from '../../shared/AppEvent';
import { getColorByProfit } from '../utils/colors';
import { getPercentageGain } from '../../server/utils';

const Title = styled.span`
   font-size: 20px;
   font-weight: bold;
`;

interface Props {
  data: RunAlgorithmResults;
  loading: boolean;
  stopRunning: () => void;
  enterSymbol: (data: EnterSymbolData) => void;
  enterSymbolData: EnterSymbolData;
  transId: string;
  totalDays: number;
}

const AlgoScreen = (props: Props) => {

  const { loading, stopRunning, enterSymbol, transId, totalDays, enterSymbolData } = props;

  const [refreshLoading, setRefreshLoad] = useState(new Date().getTime());
  const totalTrades = props.data && props.data.totalTrades || 0;
  const profit: number = props.data && props.data.profit || 0;
  const marketData = props.data && props.data.marketData || [];
  const trades = props.data && props.data.trades || [];

  const totalMarketData = marketData && marketData.length;

  // Effect to refresh images after algo completes
  useEffect(() => {
    if (!loading) {
      if (marketData.length) {
        // console.log('stopped ---------------------->')
        setTimeout(() => {
          setRefreshLoad(new Date().getTime());

          // track event
          segmentTrack(APPEVENTS.ON_ALGO_RESULTS, { ...enterSymbolData, profit, totalMarketData, totalTrades });
        }, 1000);
      }

    }
  }, [loading]);

  const time = new Date().getTime();

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
        {/* Graph bar Trades */}
        {/* <GraphBar dataSeries={
          {
            label: 'Profit',
            datums: tradesWithMarketData
          }
        } /> */}



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

  const imgProps = {
    alt: `${time}`,
    height: '370px',
    width: "100%"
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
        <Box p={3} color='black' bg="white">
          <>
            <h1>
              <strong> Profit: </strong>
              <span> {`${profit?.toFixed(2)}`}</span>
              <span style={{
                color: getColorByProfit(profit),
                fontSize: '29px',
                marginLeft: '10px'
              }}>
                {Math.round(getPercentageGain(1000, (profit + 1000)))}%
              </span>
            </h1>
            <h3> <strong> Total Trades: </strong> <span> {`${totalTrades}`} </span>  </h3>
            <h4> <strong> Market Data: </strong> <span> {`${totalMarketData}`} </span>  </h4>{/*  */}
            <h5> <strong> Capital: </strong> <span> {`$1,000 per trade`} </span>  </h5>
          </>
          {/* <ResultsBulletsLoading /> */}
        </Box>
      </Box>

      {/* Detailed Chart or server side chart */}
      {totalDays <= 2 ? (
        <GraphComponent />
      ) : (
          <div key={`${refreshLoading}`}>
            <Image {...imgProps} src={`/results/${transId}-market.jpg?id=${time}${refreshLoading}`} />
            <Image {...imgProps} src={`/results/${transId}-trades.jpg?id=${time}${refreshLoading}`} />
          </div>
        )}
    </>
  )
};

AlgoScreen.getInitialProps = async function () {
  // const res = await fetch(`${SERVER_URI}/algo`, { method: 'POST' });
  // const data = await res.json();
  // return { data };
  return {}
};

export default AlgoScreen;
