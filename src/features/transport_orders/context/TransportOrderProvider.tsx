import React from "react";
import { useDeleteTransportOrder } from "..";
import { useEditTransportOrder } from "../api";
import { TransportOrder } from "../types";

type TransportOrderContextType = {
  transportOrder: TransportOrder;
  updateTransportOrder: (attributes: TransportOrder) => void;
  removeTransportOrder: () => void;
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
  refetchOrders?: () => void;
}

export const TransportOrderProvider = ({
  transportOrder,
  children,
  refetchOrders,
}: ITransportOrderProvider) => {
  const mutateDelete = useDeleteTransportOrder((oldData, id) => {
    return oldData?.filter((item) => item.id !== id);
  });

  const mutateEdit = useEditTransportOrder(undefined, {
    id: transportOrder.id,
  });

  const removeTransportOrder = React.useCallback(() => {
    transportOrder.id && mutateDelete.mutateAsync(transportOrder.id);
  }, [mutateDelete, transportOrder]);

  const updateTransportOrder = React.useCallback(
    (attributes) => {
      mutateEdit.mutate(attributes);
    },
    [mutateEdit]
  );

  React.useEffect(() => {
    if (mutateDelete.data && refetchOrders) {
      refetchOrders();
    }
  }, [mutateDelete, refetchOrders]);

  return (
    <TransportOrderContext.Provider
      value={{
        transportOrder,
        updateTransportOrder,
        removeTransportOrder,
      }}
    >
      {children}
    </TransportOrderContext.Provider>
  );
};
