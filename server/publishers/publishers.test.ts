import 'mocha';

import { expect } from 'chai';

import { randomNumber } from '../../shared/utils/number.utils';
import { plotGraphImageToDisk } from './plotGraphImage';

describe('Publishers', () => {
    it('should plot image to disk', async () => {
        const plotGraph = await plotGraphImageToDisk('' + randomNumber())
        // eslint-disable-next-line no-unused-expressions
        expect(plotGraph).to.be.true;
    })
})