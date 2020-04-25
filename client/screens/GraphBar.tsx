/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
import isEmpty from 'lodash/isEmpty';
import React from 'react'
import { Chart } from 'react-charts'

import { DataSeries } from '../../interfaces';
// import useChartConfig from '../utils/useChartConfig'
import { DetailsTooltip } from './DetailsTooltip';

interface Props {
    dataSeries: DataSeries
}

const GraphBar = (props: Props) => {

    const { dataSeries } = props;

    if (isEmpty(dataSeries && dataSeries.datums)) {
        return null;
    }

    const series = React.useMemo(
        () => ({
            type: 'bar'
        }),
        []
    )

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

export default GraphBar;