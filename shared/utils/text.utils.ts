import isEmpty from 'lodash/isEmpty';
import random from 'lodash/random';

export const JSONDATA = (data: any): Record<string, any> | string | null => {
	if (isEmpty(data) || !data) {
		return null;
	}

	try {
		if (typeof data !== 'object') {
			return JSON.parse(data);
		}
		return data;
	} catch (error) {
		// console.log('error trying to parse response data');
		return data;
	}
};


export const randomNum = (min?: number, max?: number) => {
	return random(min || 100, max || 1000, undefined);
}

export const roundifyNum = (num: number): number => {
	return Math.round(num);
}

export const num2Fix = (num: number): number => {
	return +num.toFixed(2);
}

export default JSONDATA;