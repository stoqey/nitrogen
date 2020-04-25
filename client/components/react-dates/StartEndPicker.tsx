import omit from 'lodash/omit';
import moment, { Moment } from 'moment';
import React from 'react';
import { DateRangePicker, DateRangePickerPhrases, isSameDay } from 'react-dates';
import { css, withStyles } from 'react-with-styles';

import { ANCHOR_LEFT, END_DATE, HORIZONTAL_ORIENTATION, START_DATE } from './constants';
import defaultPhrases from './defaultPhrases';


interface Props {
    // example props for the demo
    autoFocus: boolean;
    autoFocusEndDate: boolean;
    initialStartDate: Moment
    initialEndDate: Moment
    presets: [],

    // input related props
    startDateId: string;
    startDatePlaceholderText: string;
    endDateId: string;
    endDatePlaceholderText: string;
    disabled: boolean;
    required: boolean;
    screenReaderInputMessage: string;
    showClearDates: boolean;
    showDefaultInputIcon: boolean;
    customInputIcon: any;
    customArrowIcon: any;
    customCloseIcon: any;

    // calendar presentation and interaction related props
    renderMonthText: any;
    orientation: string;
    anchorDirection: string;
    horizontalMargin: number;
    withPortal: boolean;
    withFullScreenPortal: boolean;
    initialVisibleMonth: any;
    numberOfMonths: number;
    keepOpenOnDateSelect: boolean;
    reopenPickerOnClearDates: boolean;
    isRTL: boolean;

    // navigation related props
    navPrev: any;
    navNext: any;
    onPrevMonthClick: any;
    onNextMonthClick: any;
    onClose: any;

    // day presentation and interaction related props
    renderDayContents: any
    minimumNights: number;
    enableOutsideDays: boolean;
    isDayBlocked: () => boolean;
    isOutsideRange: (day: Date) => boolean;
    isDayHighlighted: () => boolean;

    // internationalization
    displayFormat: () => any;
    monthFormat: string;
    phrases: DateRangePickerPhrases,

    handleDatesChange?: (startEnd: StartEnd) => void;

    styles: any;
}

export interface StartEnd {
    startDate: Moment,
    endDate: Moment
};

const initDefaultProps: Props = {
    // example props for the demo
    autoFocus: false,
    autoFocusEndDate: false,
    initialStartDate: moment(new Date()),
    initialEndDate: moment(new Date()),
    presets: [],

    // input related props
    startDateId: START_DATE,
    startDatePlaceholderText: 'Start Date',
    endDateId: END_DATE,
    endDatePlaceholderText: 'End Date',
    disabled: false,
    required: false,
    screenReaderInputMessage: '',
    showClearDates: false,
    showDefaultInputIcon: false,
    customInputIcon: null,
    customArrowIcon: null,
    customCloseIcon: null,

    // calendar presentation and interaction related props
    renderMonthText: null,
    orientation: HORIZONTAL_ORIENTATION,
    anchorDirection: ANCHOR_LEFT,
    horizontalMargin: 0,
    withPortal: false,
    withFullScreenPortal: false,
    initialVisibleMonth: null,
    numberOfMonths: 2,
    keepOpenOnDateSelect: false,
    reopenPickerOnClearDates: false,
    isRTL: false,

    // navigation related props
    navPrev: null,
    navNext: null,
    onPrevMonthClick() { },
    onNextMonthClick() { },
    onClose() { },

    // day presentation and interaction related props
    renderDayContents: null,
    minimumNights: 0,
    enableOutsideDays: false,
    isDayBlocked: () => false,
    isOutsideRange: () => false,
    isDayHighlighted: () => false,

    // internationalization
    displayFormat: () => moment.localeData().longDateFormat('L'),
    monthFormat: 'MMMM YYYY',
    phrases: defaultPhrases as any,

    styles: {},

    handleDatesChange: () => { }
};

interface State {
    focusedInput: any;
    startDate: Moment;
    endDate: Moment;
}

class StartEndDatePicker extends React.Component<Props, State> {

    /**
     * defaultProps
     */
    public static defaultProps = initDefaultProps;

    constructor(props: Props) {
        super(props);

        let focusedInput = null;
        if (props.autoFocus) {
            focusedInput = START_DATE;
        } else if (props.autoFocusEndDate) {
            focusedInput = END_DATE;
        }

        this.state = {
            focusedInput,
            startDate: props.initialStartDate || moment(),
            endDate: props.initialEndDate || moment(),
        };

        this.onDatesChange = this.onDatesChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
        this.renderDatePresets = this.renderDatePresets.bind(this);
    }

    onDatesChange({ startDate, endDate }: any) {
        this.setState({ startDate, endDate });
        this.props.handleDatesChange && this.props.handleDatesChange({ startDate, endDate });
    }

    onFocusChange(focusedInput: any) {
        this.setState({ focusedInput });
    }

    renderDatePresets() {
        const { presets, styles } = this.props;
        const { startDate, endDate } = this.state;

        return (
            <div {...css(styles.PresetDateRangePicker_panel)}>
                {presets.map(({ text, start, end }) => {
                    const isSelected = isSameDay(start, startDate) && isSameDay(end, endDate);
                    return (
                        <button
                            key={text}
                            {...css(
                                styles.PresetDateRangePicker_button,
                                isSelected && styles.PresetDateRangePicker_button__selected,
                            )}
                            type="button"
                            onClick={() => this.onDatesChange({ startDate: start, endDate: end })}
                        >
                            {text}
                        </button>
                    );
                })}
            </div>
        );
    }

    render() {
        const { focusedInput, startDate, endDate } = this.state;

        // autoFocus, autoFocusEndDate, initialStartDate and initialEndDate are helper props for the
        // example wrapper but are not props on the SingleDatePicker itself and
        // thus, have to be omitted.
        const props = omit(this.props, [
            'autoFocus',
            'autoFocusEndDate',
            'initialStartDate',
            'initialEndDate',
            'presets',
        ]);

        return (
            <div>
                <DateRangePicker
                    {...props as any}
                    renderCalendarInfo={this.renderDatePresets}
                    onDatesChange={this.onDatesChange}
                    onFocusChange={this.onFocusChange}
                    focusedInput={focusedInput}
                    startDate={startDate}
                    endDate={endDate}
                />
            </div>
        );
    }
}

export default withStyles(({ reactDates: { color } }) => ({
    PresetDateRangePicker_panel: {
        padding: '0 22px 11px 22px',
    },

    PresetDateRangePicker_button: {
        position: 'relative',
        height: '100%',
        textAlign: 'center',
        background: 'none',
        border: `2px solid ${color.core.primary}`,
        color: color.core.primary,
        padding: '4px 12px',
        marginRight: 8,
        font: 'inherit',
        fontWeight: 700,
        lineHeight: 'normal',
        overflow: 'visible',
        boxSizing: 'border-box',
        cursor: 'pointer',

        ':active': {
            outline: 0,
        },
    },

    PresetDateRangePicker_button__selected: {
        color: color.core.white,
        background: color.core.primary,
    },
}))(StartEndDatePicker);
