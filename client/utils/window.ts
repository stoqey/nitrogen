export const getWebsocketLink = (): string => {
    const host: string = window && window.location && window.location.hostname;

    let isProd = true;

    if (["localhost", "127.0.0.1", ""].includes(host)) {
        isProd = false;
    };

    const protocol = isProd ? 'wss' : 'ws';
    return `${protocol}://${host}/graphql`;
}