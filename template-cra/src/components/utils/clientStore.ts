export const clientStoreItem = (key: string, value: string) => localStorage.setItem(key, value);
export const clientRetrieveItem = (key: string) => localStorage.getItem(key) || '';
export const clientRemoveItem = (key: string) => localStorage.removeItem(key);
