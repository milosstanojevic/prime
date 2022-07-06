import React from 'react';
import { useEditTransportRoute, useDeleteTransportRoute } from '..';
import { Transport } from '../types';

type TransportContextType = {
    transport: Transport;
    updateTransport: (attributes: Transport) => void;
    removeTransport: (id: number) => void;
};

const TransportContext = React.createContext<TransportContextType | undefined>(undefined);

export const useTransportContext = () => {
    const ctx = React.useContext(TransportContext);

    if (ctx === undefined) {
        throw new Error(`'useTransportContext' must be used within a 'TransportContextProvider'`);
    }

    return ctx;
};

interface ITransportProvider {
    transport: Transport;
    children: React.ReactNode;
}

export const TransportProvider = ({ transport, children }: ITransportProvider) => {
    const mutateEdit = useEditTransportRoute((oldTransports, newTransport) => {
        return oldTransports?.map((transport) =>
            transport.id === newTransport.id ? { ...transport, ...newTransport } : transport
        );
    });

    const mutateDelete = useDeleteTransportRoute((oldData, id) => {
        return oldData?.filter((item) => item.id !== id);
    });

    const updateTransport = React.useCallback(
        (attributes: Transport) => {
            mutateEdit.mutate(attributes);
        },
        [mutateEdit]
    );

    const removeTransport = React.useCallback(
        (transportId: number) => {
            mutateDelete.mutate(transportId);
        },
        [mutateDelete]
    );

    return (
        <TransportContext.Provider
            value={{
                transport,
                updateTransport,
                removeTransport
            }}
        >
            {children}
        </TransportContext.Provider>
    );
};
