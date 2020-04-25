import 'mocha';

import { expect } from 'chai';

import { getSplitedTime } from './time.utils';

describe('Given utilities', () => {
    it('should get date ranges from two dates', (done) => {
        const startDate = new Date('03-25-2020');
        const endDate = new Date('04-10-2020');

        const dates = getSplitedTime(startDate, endDate);
        console.log(dates);
        expect(dates).to.not.be.empty;
        done();

    })
})