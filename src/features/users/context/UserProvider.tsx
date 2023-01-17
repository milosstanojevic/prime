import React from 'react';
import { User } from '../types';

type UserContextType = {
    user: User;
};

const UserContext = React.createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
    const ctx = React.useContext(UserContext);

    if (ctx === undefined) {
        throw new Error(`'useUserContext' must be used within a 'UserContextProvider'`);
    }

    return ctx;
};

interface IUserProvider {
    user: User;
    children: React.ReactNode;
}

export const UserProvider = ({ user, children }: IUserProvider) => {
    return (
        <UserContext.Provider
            value={{
                user
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
