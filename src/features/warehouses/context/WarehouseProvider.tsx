import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeGetWarehouseById } from "../selectors";
import { editWarehouse } from "../actions";
import { Warehouse } from "../types";

type WarehouseContextType = {
  warehouse: Warehouse;
  updateWarehouse: (id: number, attributes: Warehouse) => void;
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
  id?: number;
  children: React.ReactNode;
}

export const WarehouseProvider = ({ id, children }: IWarehouseProvider) => {
  const dispatch = useDispatch();
  const getWarehouseById = useMemo(() => makeGetWarehouseById(id), [id]);
  const warehouse = useSelector(getWarehouseById);

  const updateWarehouse = React.useCallback(
    (warehouseId: number, attributes: Warehouse) => {
      dispatch(editWarehouse(warehouseId, attributes));
    },
    [dispatch]
  );

  const removeWarehouse = React.useCallback((warehouseId: number) => {
    console.log(warehouseId);
  }, []);

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
