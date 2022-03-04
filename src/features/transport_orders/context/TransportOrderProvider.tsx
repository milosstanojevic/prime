import React from "react";
import { TransportOrder } from "../types";

type TransportOrderContextType = {
  transportOrder: TransportOrder;
  updateTransportOrder: (attributes: TransportOrder) => void;
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
  transportOrder: TransportOrder;
  children: React.ReactNode;
}

export const TransportOrderProvider = ({
  transportOrder,
  children,
}: ITransportOrderProvider) => {
  const updateTransportOrder = React.useCallback((attributes) => {
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
