import { useAuthContext } from 'features/auth/context';
import { LoggedUserProvider } from 'context/LoggedUserProvider';
import React, { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loading, Navbar } from './components';

export const ProtectedRoute: React.FC<{ children: ReactElement }> = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuthContext();
    const location = useLocation();

    if (isLoading) {
        return <Loading />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace state={{ from: location }} />;
    }

    return (
        <LoggedUserProvider>
            <Navbar />
            {children}
        </LoggedUserProvider>
    );
};
