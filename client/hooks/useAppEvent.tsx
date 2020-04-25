import React, { useState, useEffect } from 'react';
import { AppEvents } from '../../shared/AppEvent';

export function useAppEvent(eventName: string): any {
    const events = AppEvents.Instance;

    const [dbData, setData] = useState<any>(null);

    useEffect(() => {
        const handle = (data: any) => {
            setData({ ...data, time: new Date() })
        };

        events.on(eventName, handle);
        return () => {
            events.off(eventName, handle)
        };

    }, []);

    return !dbData ? {} as any : dbData;

}