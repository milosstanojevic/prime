import React from "react";
import { useDeleteWarehouse, useEditWarehouse } from "../api";
import { Warehouse } from "../types";

type WarehouseContextType = {
  warehouse: Warehouse;
  updateWarehouse: (attributes: Warehouse) => void;
  removeWarehouse: (id: number) => void;
};

const WarehouseContext = React.createContext<WarehouseContextType | undefined>(
  undefined
);

export const useWarehouseContext = () => {
  const ctx = React.useContext(WarehouseContext);

  if (ctx === undefined) {
    throw new Error(
      `'useWarehouseContext' must be used within a 'WarehouseContextProvider'`
    );
  }

  return ctx;
};

interface IWarehouseProvider {
  warehouse: Warehouse;
  children: React.ReactNode;
}

export const WarehouseProvider = ({
  warehouse,
  children,
}: IWarehouseProvider) => {
  const mutateEdit = useEditWarehouse((oldWarehouses, newWarehouse) => {
    return oldWarehouses?.map((warehouse) =>
      warehouse.id === newWarehouse.id
        ? { ...warehouse, ...newWarehouse }
        : warehouse
    );
  });
  const mutateDelete = useDeleteWarehouse((oldData, id) => {
    return oldData?.filter((item) => item.id !== id);
  });

  const updateWarehouse = React.useCallback(
    (attributes: Warehouse) => {
      mutateEdit.mutateAsync(attributes);
    },
    [mutateEdit]
  );

  const removeWarehouse = React.useCallback(
    (warehouseId: number) => {
      mutateDelete.mutateAsync(warehouseId);
    },
    [mutateDelete]
  );

  return (
    <WarehouseContext.Provider
      value={{
        warehouse,
        updateWarehouse,
        removeWarehouse,
      }}
    >
      {children}
    </WarehouseContext.Provider>
  );
};
