import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeGetTransportById } from "../selectors";
import { editTransport } from "../actions";
import { Transport } from "../types";

type TransportContextType = {
  transport: Transport;
  updateTransport: (id: number, attributes: Transport) => void;
  removeTransport: (id: number) => void;
};

const TransportContext = React.createContext<TransportContextType | undefined>(
  undefined
);

export const useTransportContext = () => {
  const ctx = React.useContext(TransportContext);

  if (ctx === undefined) {
    throw new Error(
      `'useTransportContext' must be used within a 'TransportContextProvider'`
    );
  }

  return ctx;
};

interface ITransportProvider {
  id: number;
  children: React.ReactNode;
}

export const TransportProvider = ({ id, children }: ITransportProvider) => {
  const dispatch = useDispatch();
  const getTransportById = useMemo(() => makeGetTransportById(id), [id]);
  const transport = useSelector(getTransportById);

  const updateTransport = React.useCallback(
    (transportId: number, attributes: Transport) => {
      dispatch(editTransport(transportId, attributes));
    },
    [dispatch]
  );

  const removeTransport = React.useCallback((transportId: number) => {
    console.log(transportId);
  }, []);

  return (
    <TransportContext.Provider
      value={{
        transport,
        updateTransport,
        removeTransport,
      }}
    >
      {children}
    </TransportContext.Provider>
  );
};
