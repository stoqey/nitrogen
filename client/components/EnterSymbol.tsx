import {
    Input,
    Label,
    Select,
} from '@rebass/forms'
import { ClientDB } from 'client/db/ClientDB';
import { segmentTrack } from 'client/utils/analytics';
import moment from 'moment';
import React, { useState } from 'react';
import Loader from 'react-loader-spinner';
import { Box, Button, Flex } from 'rebass';
import styled from 'styled-components';

import { AlgoMode } from '../../interfaces';
import { APPEVENTS } from '../../shared/AppEvent';
import StartEndDatePicker, { StartEnd } from './react-dates/StartEndPicker'

const InputWrapper = styled.div`
    border-radius: 2px;
    border: 1px solid #dbdbdb;
    padding: 1px;
`;

const clientDb = ClientDB.Instance;

interface Props {
    loading: boolean;
    stopRunning: () => void;
    enterSymbol: (data: EnterSymbolData) => void;
}

export interface EnterSymbolData {
    startDate: Date;
    endDate: Date;
    symbol: string;
    algoMode: AlgoMode;
    time?: Date;
};

export const EnterSymbol = (props: Props) => {

    const { stopRunning, loading, enterSymbol } = props;
    const { symbol: initSymbol, endDate: initEndDate = new Date, startDate: initStartDate = new Date, algoMode: initAlgoMode = 'BUY' } = clientDb.getState();
    const [symbol, setSymbol] = useState(initSymbol || '');
    const [algoMode, setAlgoMode] = useState(initAlgoMode || 'BUY');

    // StartEnd State
    const initState = { startDate: moment(new Date(initStartDate)), endDate: moment(new Date(initEndDate)) }
    const [startEndDates, setStartEndDates] = useState<StartEnd>(initState);
    const { endDate, startDate } = startEndDates;


    const saveState = (data: any) => {
        clientDb.setState({
            ...(clientDb.getState()),
            ...data,
        })
    };

    const saveDatesToLocal = (date: StartEnd) => {
        saveState({
            startDate: (date.startDate || moment()).toDate(),
            endDate: (date.endDate || moment()).toDate()
        })
    }

    const submitForm = () => {
        enterSymbol(
            { symbol: (symbol || "").toLocaleUpperCase(), startDate: startDate.toDate(), endDate: endDate.toDate(), algoMode, time: new Date() }
        )
    }

    const inputFieldsStyle = {
        padding: '11px 11px 9px !important',
        fontSize: '19px !important',
        border: 'none !important'
    }

    // const EnterButton = () => {
    //     return (
    //         <Amplitude
    //             eventProperties={(inheritedProps: any) => ({
    //                 ...inheritedProps,
    //                 // scope: [...inheritedProps.scope, "square"]
    //             })}
    //         >
    //             {({ instrument }: any) => (

    //             )}
    //         </Amplitude>
    //     )
    // }




    return (
        <Box
            as='form'
            onSubmit={e => e.preventDefault()}
            py={3}>
            <Flex mx={-2} mb={3}>
                <Box width={1 / 2.6} px={2}>
                    <Label htmlFor='name'>Symbol</Label>

                    <InputWrapper>
                        <Input
                            value={symbol}
                            onChange={(e: any) => {
                                const newSymbol = e.target.value;
                                setSymbol(newSymbol);
                                saveState({ symbol: newSymbol });
                            }}
                            id='symbol'
                            name='symbol'
                            defaultValue='Jane Doe'
                            style={inputFieldsStyle}
                        />
                    </InputWrapper>

                    <br />
                    <Label htmlFor='name'>Algo Mode</Label>
                    <InputWrapper>
                        <Select
                            id="algoMode"
                            name="algoMode"
                            value={algoMode}
                            style={inputFieldsStyle}
                            onChange={
                                (e: any) => {
                                    const algoModeNew = e.target.value;
                                    setAlgoMode(algoModeNew);
                                    saveState({ algoMode: algoModeNew });
                                }
                            }>
                            <option value="BUY">BUY</option>
                            <option value="SELL">SELL</option>
                            <option value="ALL">ALL</option>
                        </Select>
                    </InputWrapper>

                </Box>
                <Box width={1 / 2} px={2}>
                    <Label htmlFor='startDate'>Start Date - End Date</Label>

                    <StartEndDatePicker initialEndDate={endDate} initialStartDate={startDate} handleDatesChange={(dates) => {
                        saveDatesToLocal(dates); // persist to device
                        setStartEndDates(dates); // Save end dates
                    }} />

                    <br />
                    <div>
                        <Label htmlFor='startDate'>{loading ? 'Running' : 'Ready'}</Label>
                        <span style={{ display: 'flex', height: '40px' }}>
                            {/* RUN/STOP button */}
                            <Button bg={!loading ? 'primary' : 'red'} marginRight={10} onClick={() => {

                                // Submit or Stop
                                !loading ? submitForm() : stopRunning();

                                // Instrument or non
                                !loading && segmentTrack(APPEVENTS.RUN_ALGO, { symbol: (symbol || "").toLocaleUpperCase(), startDate: startDate.toDate(), endDate: endDate.toDate(), algoMode, time: new Date() });

                            }}>
                                {!loading ? 'RUN' : 'STOP'}
                            </Button>
                            {loading && (<Loader type="Bars" color="#00BFFF" height={40} width={40} />)}
                        </span>
                    </div>
                </Box>
            </Flex>
        </Box>
    )
}