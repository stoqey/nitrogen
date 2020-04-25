import React from 'react'
import { Chart } from 'react-charts'
import { DataSeries } from '../../interfaces';
// import useChartConfig from '../utils/useChartConfig'
import isEmpty from 'lodash/isEmpty';

interface Props {
    dataSeries: DataSeries
}

const GraphScreen = (props: Props) => {

    const { dataSeries } = props;

    if (isEmpty(dataSeries)) {
        return null;
    }

    const series = React.useMemo(
        () => ({
            showPoints: false
        }),
        []
    )

    const tooltip = React.useMemo(
        () => ({
            render: ({ datum }: any) => {
                const price = datum && datum.originalDatum && datum.originalDatum.y;
                const time = datum && datum.originalDatum && datum.originalDatum.x;

                return (
                    <>
                        <div>{price}</div>
                        <p>{`${new Date(time)}`}</p>
                    </>
                )
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

export default GraphScreen;