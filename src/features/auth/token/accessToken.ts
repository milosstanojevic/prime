import { setToken, getToken, removeToken } from './main';

const tokenKey = 'at';
const key = import.meta.env.VITE_ACCESS_TOKEN_KEY || 'default-access-token';

export const getAccessToken = () => {
    return getToken(tokenKey, key);
};

export const setAccessToken = (token: string) => {
    setToken(tokenKey, token, key);
};

export const removeAccessToken = () => {
    removeToken(tokenKey);
};
