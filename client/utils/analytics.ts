export const amplitudeInstrument = (eventName: string, data: any) => {
    (window as any).amplitude.getInstance().logEvent(eventName, data);
}

export const segmentTrack = (eventName: string, data: any) => {
    (window as any).analytics.track((eventName || '').toLocaleUpperCase(), data || {});
}