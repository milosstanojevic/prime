import axios from 'axios';
import { UserToken, RefreshTokenParams, GrantTokenParams } from '../types';

const API_ROOT = import.meta.env.VITE_URI || '';
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID || '';
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET || '';

export const obtainToken = (attributes: GrantTokenParams) => {
    return axios.post<UserToken>(
        `${API_ROOT}/o/token/`,
        {
            grant_type: 'password',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            ...attributes
        },
        {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }
    );
};

export const refreshToken = (attributes: RefreshTokenParams) => {
    return axios.post<UserToken>(
        `${API_ROOT}/o/token/`,
        {
            grant_type: 'refresh_token',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            ...attributes
        },
        {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }
    );
};

export const revokeToken = (token: string) => {
    return axios.post(
        `${API_ROOT}/o/revoke-token/`,
        { client_id: CLIENT_ID, client_secret: CLIENT_SECRET, token },
        {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }
    );
};
