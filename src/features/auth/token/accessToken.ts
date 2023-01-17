import { setToken, getToken, removeToken } from './main';

const tokenKey = 'at';
const key = process.env.REACT_APP_ACCESS_TOKEN_KEY || 'default-access-token';

export const getAccessToken = () => {
    return getToken(tokenKey, key);
};

export const setAccessToken = (token: string) => {
    setToken(tokenKey, token, key);
};

export const removeAccessToken = () => {
    removeToken(tokenKey);
};
