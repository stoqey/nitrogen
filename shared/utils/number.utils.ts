import random from 'lodash/random';

export const randomNumber = (min?: number, max?: number): number => {
    return random(min || 1000, max || 100000);
}