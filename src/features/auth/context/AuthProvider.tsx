import { AxiosResponse } from 'axios';
import React from 'react';
import * as tokenRequest from '../api';
import {
    setRefreshToken,
    getRefreshToken,
    removeRefreshToken,
    getAccessToken,
    setAccessToken,
    removeAccessToken
} from '../token';
import { GrantTokenParams } from '../types';

type AuthContextType = {
    isAuthenticated: boolean;
    isLoading: boolean;
    obtainToken: (attributes: GrantTokenParams) => Promise<void>;
    refreshToken: () => Promise<void>;
    logout: () => Promise<AxiosResponse<any, any>>;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
    const ctx = React.useContext(AuthContext);

    if (ctx === undefined) {
        throw new Error(`'useAuthContext' must be used within a 'AuthContextProvider'`);
    }

    return ctx;
};

interface IAuthProvider {
    children: React.ReactNode;
}

let timeout: NodeJS.Timeout;

export const AuthProvider = ({ children }: IAuthProvider) => {
    const token = getAccessToken();
    const [isLoading, setIsLoading] = React.useState(false);

    const obtainToken = React.useCallback((attributes: GrantTokenParams) => {
        setIsLoading(true);
        return tokenRequest.obtainToken(attributes).then((response) => {
            const { access_token, refresh_token } = response.data;
            access_token && setAccessToken(access_token);
            refresh_token && setRefreshToken(refresh_token);
            setIsLoading(false);
        });
    }, []);

    const logout = React.useCallback(() => {
        const token = getAccessToken();
        removeRefreshToken();
        setIsLoading(true);
        return tokenRequest.revokeToken(token || '').finally(() => {
            removeAccessToken();
            setIsLoading(false);
        });
    }, []);

    const refreshToken = React.useCallback(() => {
        const refresh_token = getRefreshToken();
        return tokenRequest
            .refreshToken({ refresh_token })
            .then((response) => {
                clearTimeout(timeout);
                const { access_token, refresh_token } = response.data;
                access_token && setAccessToken(access_token);
                refresh_token && setRefreshToken(refresh_token);
                const expiresIn = response.data.expires_in || 900;
                timeout = setTimeout(() => {
                    getRefreshToken();
                }, expiresIn * 1000 - 30000);
            })
            .catch((e) => {
                console.error(e?.message || 'Something went wrong');
                logout();
            });
    }, [logout]);

    const isAuthenticated = React.useMemo(() => {
        return !!token;
    }, [token]);

    return (
        <AuthContext.Provider
            value={{
                isLoading,
                obtainToken,
                isAuthenticated,
                refreshToken,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
