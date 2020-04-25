import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

export function useFetch(opt: AxiosRequestConfig): any {

    const [dbData, setData] = useState<any>(null);

    useEffect(() => {
        async function getData() {
            const { data }: AxiosResponse = await axios(opt)
            setData(data);
        }
        getData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return !dbData ? {} as any : dbData;

}