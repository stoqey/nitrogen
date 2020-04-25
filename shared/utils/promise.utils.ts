export function delay(t: number, v: string) {
    return new Promise(function (resolve) {
        setTimeout(resolve.bind(null, v), t)
    });
}

export async function swallowPromise(promise: () => Promise<any>): Promise<null> {
    try {
        await promise();
    }
    catch (error) {
        console.log('silent-error', error);
    }
    finally {
        return null;
    }

}