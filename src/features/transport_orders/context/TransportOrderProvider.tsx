import React from "react";
import { useSelector } from "react-redux";
import { makeGetTransportOrderById } from "../selectors";
import { TransportOrder } from "../types";

type TransportOrderContextType = {
  transportOrder: TransportOrder;
  updateTransportOrder: (id: number, attributes: TransportOrder) => void;
};

const TransportOrderContext = React.createContext<
  TransportOrderContextType | undefined
>(undefined);

export const useTransportOrderContext = () => {
  const ctx = React.useContext(TransportOrderContext);

  if (ctx === undefined) {
    throw new Error(
      `'useTransportOrderContext' must be used within a 'TransportOrderContextProvider'`
    );
  }

  return ctx;
};

interface ITransportOrderProvider {
  id: number;
  children: React.ReactNode;
}

export const TransportOrderProvider = ({
  id,
  children,
}: ITransportOrderProvider) => {
  const getTransportOrderById = React.useMemo(
    () => makeGetTransportOrderById(id),
    [id]
  );
  const transportOrder = useSelector(getTransportOrderById);

  const updateTransportOrder = React.useCallback((id, attributes) => {
    console.log(id);
    console.log(attributes);
  }, []);

  return (
    <TransportOrderContext.Provider
      value={{
        transportOrder,
        updateTransportOrder,
      }}
    >
      {children}
    </TransportOrderContext.Provider>
  );
};
