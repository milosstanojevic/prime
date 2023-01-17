import React from 'react';
import { useGetLoggedUser } from '../features/users/api';
import { User } from '../features/users/types';

type LoggedUserContextType = {
    user?: User;
};

const LoggedUserContext = React.createContext<LoggedUserContextType | undefined>(undefined);

export const useLoggedUserContext = () => {
    const ctx = React.useContext(LoggedUserContext);

    if (ctx === undefined) {
        throw new Error(`'useLoggedUserContext' must be used within a 'LoggedUserContextProvider'`);
    }

    return ctx;
};

interface ILoggedUserProvider {
    children: React.ReactNode;
}

export const LoggedUserProvider = ({ children }: ILoggedUserProvider) => {
    const { data } = useGetLoggedUser();
    return (
        <LoggedUserContext.Provider
            value={{
                user: data
            }}
        >
            {children}
        </LoggedUserContext.Provider>
    );
};
