import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import {
    QueryClient as TanstackQueryClient,
    QueryClientProvider as TanstackQueryClientProvider
} from '@tanstack/react-query';
import { AuthProvider } from './features/auth/context';

const config = {
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: true,
            refetchOnMount: true,
            refetchOnReconnect: true,
            retry: false,
            staleTime: 1000 // 1000 * 60 * 60 * 24 = 24h
        }
    }
};

const queryClient = new TanstackQueryClient(config);
const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <React.StrictMode>
        <TanstackQueryClientProvider client={queryClient}>
            <AuthProvider>
                <App />
            </AuthProvider>
        </TanstackQueryClientProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
