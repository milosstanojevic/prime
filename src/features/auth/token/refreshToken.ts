import { setToken, getToken, removeToken } from './main';

const tokenKey = 'rt';
const key = import.meta.env.VITE_REFRESH_TOKEN_KEY || 'default-token-key';

export const getRefreshToken = () => {
    return getToken(tokenKey, key);
};

export const setRefreshToken = (token: string) => {
    setToken(tokenKey, token, key);
};

export const removeRefreshToken = () => {
    removeToken(tokenKey);
};
