
import moment from 'moment';
import React from 'react'

import { getProfitColor } from '../utils/colors';

export function DetailsTooltip({ primaryAxis, datum }: any) {

  // console.log('datnum', datum);
  const tradeType = datum && datum.originalDatum && datum.originalDatum.t;
  const entryTime = datum && datum.originalDatum && datum.originalDatum.entryTime;
  const exitTime = datum && datum.originalDatum && datum.originalDatum.exitTime;

  const getTimeDiff = (entry: Date, exit: Date) => {
    const tradeStartingTime = moment(entry);
    const tradeEndingTime = moment(exit);
    const duration = moment.duration(tradeStartingTime.diff(tradeEndingTime));
    // console.log('times', {
    //   tradeStartingTime: tradeStartingTime.toDate(),
    //   tradeEndingTime: tradeEndingTime.toDate()
    // })
    return duration.humanize();
  }

  return datum ? (
    <div
      style={{
        color: 'white',
        pointerEvents: 'none'
      }}
    >
      <h3
        style={{
          display: 'block',
          textAlign: 'center'
        }}
      >
        {primaryAxis.format(datum.primary)}
      </h3>

      <div
        style={{
          width: '50px',
          height: '50px',
          display: 'flex',
          background: getProfitColor(tradeType)
        }}
      >
      </div>

      <div>
        {`${getTimeDiff(entryTime, exitTime)}`}
      </div>
      <p>
        From: {`${new Date(entryTime)}`}
      </p>
      <div>
        To: {`${new Date(exitTime)}`}
      </div>
    </div>
  ) : null
}