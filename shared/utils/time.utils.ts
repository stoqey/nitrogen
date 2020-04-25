import moment, { unitOfTime } from 'moment';

export const getTimeDiff = (start: Date, end: Date, as: unitOfTime.Base): number => {
    const startingTime = moment(start);
    const endingTime = moment(end);
    const duration = moment.duration(endingTime.diff(startingTime));
    return duration.as(as);
}

export interface SplitedTime {
    startDate: Date,
    endDate: Date,
    // chunk: Date[]
}

interface GetSplitedTime {
    items: SplitedTime[];
    totalDays: number;
};

export const getSplitedTime = (startDate: Date, endDate: Date): GetSplitedTime => {

    // const startDate = new Date('03-25-2020');
    // const endDate = new Date('04-10-2020');

    let timeDif: number = Math.round(getTimeDiff(startDate, endDate, 'days'));

    if (timeDif <= 0) {
        timeDif = 1;
    }

    const dates = [startDate];

    // Add all dates to an array
    const arrays = new Array(timeDif).fill(new Date());
    arrays.forEach((item, index) => {
        const startingDate = new Date(startDate);
        const pos = index + 1;
        const currentDay = new Date(startingDate.setDate(startingDate.getDate() + pos));
        dates.push(currentDay);
    });

    // const chunkSize = 3;
    // Chunkify all datas 
    // const dateChunks = chunk(dates, chunkSize);

    // Organise dates from start to finish
    // dateChunks.filter(((dc) => dc && dc.length !== 0))
    const organisedDatesWithRanges: SplitedTime[] = dates.map((d) => {

        const currentDay = new Date(d);

        // 9 - 5 PM
        // Starting at 9 AM
        const start = new Date(currentDay.setHours(9, 0, 0, 0))

        // Ends at 5 PM
        const end = new Date(currentDay.setHours(17, 0, 0, 0));

        return {
            startDate: start,
            endDate: end,
        }
    });

    // console.log('The dates are', {
    //     // start: startDate + ' ',
    //     // end: endDate + ' ',
    //     timeDif,
    //     dateChunks,
    //     organisedDatesWithRanges
    // });

    return {
        totalDays: timeDif,
        items: organisedDatesWithRanges
    }
}