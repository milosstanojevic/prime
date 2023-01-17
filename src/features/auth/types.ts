export type TokenGrantType = 'password' | 'refresh_token';

export type UserToken = {
    access_token?: string;
    token_type?: string;
    expires_in?: number;
    refresh_token?: string;
    scope?: string;
};

export type GrantTokenParams = {
    username?: string;
    password?: string;
};

export type RefreshTokenParams = {
    refresh_token?: string;
};

export type UserData = {
    id: number;
    name: string;
};
