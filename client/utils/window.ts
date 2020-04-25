import includes from 'lodash/includes';

export const getWebsocketLink = (): string => {
    const url: string = window && window.location && window.location.href;
    const arr = url.split("/");
    const host = arr[2];
    const proto = arr[0];
    const protocol = proto === 'https' ? 'wss' : 'ws';
    return `${protocol}://${host}/graphql`;
}