import 'mocha';
import { expect } from 'chai';
import { plotGraphImageToDisk } from './plotGraphImage';
import { randomNumber } from '../../shared/utils/number.utils';

describe('Publishers', () => {
    it('should plot image to disk', async () => {
        const plotGraph = await plotGraphImageToDisk('' + randomNumber())
        expect(plotGraph).to.be.true;
    })
})