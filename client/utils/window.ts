
export const getWebsocketLink = (): string => {
    const url: string = window && window.location && window.location.href;
    const hostname: string = window && window.location && window.location.hostname;


    let isProd = true;

    if (["localhost", "127.0.0.1", ""].includes(hostname)) {
        isProd = false;
    };

    const arr = url.split("/");
    const host = arr[2];

    const protocol = isProd ? 'wss' : 'ws';
    return `${protocol}://${host}/graphql`;
}