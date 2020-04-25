import * as d3Time from 'd3-time-format'
import React from 'react';
import {
    Bar, BarChart, CartesianGrid, Cell, Legend, ReferenceLine,
    ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';

import { Datum } from '../../../interfaces';

interface Props {
    dataSeries: Datum[]
}

export function TradeDataCharts(props: Props) {
    const { dataSeries } = props;
    return (
        <ResponsiveContainer width='100%' height={500}>
            <BarChart
                data={dataSeries}
                margin={{
                    top: 10, right: 10, left: 0, bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                    dataKey='x'
                    domain={['auto', 'auto']}
                    name='Time'
                    tickFormatter={(unixTime) => d3Time.timeFormat('%I:%M:%S')(unixTime)}
                    type='number'
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Cell />
                <ReferenceLine y={0} stroke="#000" />
                <Bar dataKey="y" fill="#82ca9d" />

            </BarChart>
        </ResponsiveContainer>

    );
}
