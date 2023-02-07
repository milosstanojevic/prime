import axios, { AxiosError } from 'axios';
import { refreshToken } from '../features/auth';
import {
    getAccessToken,
    getRefreshToken,
    removeAccessToken,
    removeRefreshToken,
    setAccessToken,
    setRefreshToken
} from '../features/auth/token';

const API_ROOT = import.meta.env.VITE_API_URL || '';

const URI = import.meta.env.VITE_URI || '';

const ROOT_URL = `${URI}${API_ROOT}`;

const getHeaders = (headers?: Headers) => {
    const additional = headers || {};
    const token = getAccessToken();
    return {
        ...(token && { Authorization: `Bearer ${token}` }),
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...additional
    };
};

const instance = axios.create({
    baseURL: ROOT_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (err.response) {
            // Access Token was expired
            console.log(err, 'error');
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                const refreshTokenParam = getRefreshToken();

                try {
                    const rs = await refreshToken({ refresh_token: refreshTokenParam || '' });
                    const { access_token, refresh_token } = rs.data;
                    access_token && setAccessToken(access_token);
                    refresh_token && setRefreshToken(refresh_token);

                    return instance(originalConfig);
                } catch (_error) {
                    if (_error instanceof AxiosError && _error.response && _error.response.data) {
                        removeAccessToken();
                        removeRefreshToken();
                        window.location.replace('/');
                        return Promise.reject(_error.response.data);
                    }

                    return Promise.reject(_error);
                }
            }

            if (err.response.status === 401 && originalConfig._retry) {
                removeAccessToken();
                removeRefreshToken();
                window.location.replace('/');
                return Promise.reject(err.response.data);
            }

            if (err.response.status === 400) {
                console.log(err, 'Error');
            }

            if (err.response.status === 403 && err.response.data) {
                return Promise.reject(err.response.data);
            }
        }

        return Promise.reject(err);
    }
);

export const api = {
    get: <T>(url: string, params?: object) =>
        instance.get<T>(`${url}`, {
            headers: getHeaders(),
            ...params
        }),
    post: <T>(url: string, data: any) =>
        instance.post<T>(`${url}`, data, {
            headers: getHeaders()
        }),
    patch: <T>(url: string, data: any) =>
        instance.patch<T>(`${url}`, data, {
            headers: getHeaders()
        }),
    put: <T>(url: string, data: any) =>
        instance.put<T>(`${url}`, data, {
            headers: getHeaders()
        }),
    delete: <T>(url: string) =>
        instance.delete<T>(`${url}`, {
            headers: getHeaders()
        })
};
