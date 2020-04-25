import React, { PureComponent } from 'react';
import * as d3Time from 'd3-time-format'
import moment from 'moment';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Datum } from '../../../interfaces';

interface Props {
    dataSeries: Datum[]
}

export function MarketDataChart(props: Props) {
    const { dataSeries } = props;
    return (
        <ResponsiveContainer width='100%' height={500}>
            <AreaChart
                // width={500}
                // height={400}
                data={dataSeries}
                margin={{
                    top: 10, right: 30, left: 0, bottom: 0,
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
                <Area type="monotone" dataKey="y" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
        </ResponsiveContainer>

    );
}
