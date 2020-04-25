import React from 'react'
import { Chart } from 'react-charts'
import { DataSeries } from '../../interfaces';
// import useChartConfig from '../utils/useChartConfig'
import isEmpty from 'lodash/isEmpty';
import { DetailsTooltip } from './DetailsTooltip';

interface Props {
    dataSeries: DataSeries
}

const GraphLine = (props: Props) => {

    const { dataSeries } = props;

    if(isEmpty(dataSeries && dataSeries.datums)){
        return null;
    }

    const series = React.useMemo(
        () => ({
            showPoints: false
        }),
        []
    )

    // const tooltip = React.useMemo(
    //     () => ({
    //         render: ({ datum }: any) => {
    //             const price = datum && datum.originalDatum && datum.originalDatum.y;
    //             const time = datum && datum.originalDatum && datum.originalDatum.x;

    //             return (
    //                 <>
    //                     <div>{price}</div>
    //                     <p>{`${new Date(time)}`}</p>
    //                 </>
    //             )
    //         }
    //     }),
    //     []
    // )

    const tooltip = React.useMemo(
        () => ({
          render: ({ datum, primaryAxis, getStyle }: any) => {
            return <DetailsTooltip {...{ getStyle, primaryAxis, datum }} />
          }
        }),
        []
      )

    const axes = React.useMemo(
        () => [
            { primary: true, type: 'time', position: 'bottom' },
            { type: 'linear', position: 'left' }
        ],
        []
    )
    return (
        <>
            <div style={{ height: 400 }}>
                <Chart
                    id="somechart"
                    data={[dataSeries]}
                    series={series}
                    axes={axes}
                    tooltip={tooltip}
                    primaryCursor
                    secondaryCursor
                />
            </div>
            <br />
        </>
    )
}

export default GraphLine;