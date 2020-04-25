import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

export function useFetch(opt: AxiosRequestConfig): any {

    const [dbData, setData] = useState<any>(null);

    useEffect(() => {
        async function getData() {
            const { data }: AxiosResponse = await axios(opt)
            setData(data);
        }
        getData();

    }, [])

    return !dbData ? {} as any : dbData;

}