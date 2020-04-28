export const getWebsocketLink = (): string => {
    const url: string = window && window.location && window.location.href;
    const arr = url.split("/");
    const host = arr[2];
    const proto = arr[0];
    const isProd = proto === 'https';
    const protocol = isProd ? 'wss' : 'ws';
    return `${protocol}://${host}/graphql`;
}