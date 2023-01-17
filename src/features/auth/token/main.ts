import crypto from 'crypto-js';
import Cookies from 'js-cookie';

const encryptString = (text: string, key: string) => {
    return crypto.AES.encrypt(text, key).toString();
};

const decryptString = (encryptedData: string, key: string) => {
    const bytes = crypto.AES.decrypt(encryptedData, key);
    return bytes.toString(crypto.enc.Utf8);
};

export const setToken = (tokenKey: string, token: string, key: string) => {
    const encryptedToken = encryptString(token, key);
    Cookies.set(tokenKey, JSON.stringify(encryptedToken));
};

export const getToken = (tokenKey: string, key: string): string | undefined => {
    const data = Cookies.get(tokenKey);
    if (data) {
        const encryptedData = JSON.parse(data);
        return decryptString(encryptedData, key);
    }
    return undefined;
};

export const removeToken = (tokenKey: string) => {
    Cookies.remove(tokenKey);
};
