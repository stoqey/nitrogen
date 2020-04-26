import includes from 'lodash/includes';

export const getWebsocketLink = (): string => {
    const url: string = window && window.location && window.location.href;
    const arr = url.split("/");
    const host = arr[2];
    const protocol = !includes(host, 'localhost') ? 'wss' : 'ws';
    return `${protocol}://${host}/graphql`;
}