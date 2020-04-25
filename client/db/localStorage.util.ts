export class LocalStorageUtility {
    getItem(key: string): any {
        try {
            if (typeof window !== 'undefined') {
                return JSON.parse(`${localStorage && localStorage.getItem(key) || ""}`);
            }
        }
        catch (error) {
            console.log('error getting item', error);
            return null;
        }
    }

    saveItem(key: string, data: any): any {
        return localStorage.setItem(key, JSON.stringify(data));
    }
}