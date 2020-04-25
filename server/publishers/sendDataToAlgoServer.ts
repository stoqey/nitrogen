import axios from 'axios';
import { algoServerHost, algoServerPort } from '../config';

/**
 * Send data to algo server
 * @param path 
 * @param data 
 */
export async function sendDataToAlgoServer(path: string, body: any): Promise<any> {
    const url = `${algoServerHost}:${algoServerPort}${path}`;

    let response;

    try {
        const { data = {} } = await axios.post(url, body);
        response = data;
        console.log('successfully sent data to algo server', body && body.symbol);
    }
    catch (error) {
        console.log('error sending data to algo server', error && error.message);
    }
    finally {
        return response;
    }
}