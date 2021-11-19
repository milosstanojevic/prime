import React from "react";
import { useSelector } from "react-redux";
import { makeGetRegalPositionById } from "../selectors";
import { RegalPosition } from "../types";

type WarehouseRegalPositionContextType = {
  regalPosition: RegalPosition;
  warehouseId: number;
  regalId: number;
};

const WarehouseRegalPositionContext = React.createContext<
  WarehouseRegalPositionContextType | undefined
>(undefined);

export const useWarehouseRegalPositionContext = () => {
  const ctx = React.useContext(WarehouseRegalPositionContext);

  if (ctx === undefined) {
    throw new Error(
      `'useWarehouseRegalPositionContext' must be used within a 'WarehouseRegalPositionContextProvider'`
    );
  }

  return ctx;
};

interface IWarehouseRegalPositionProvider {
  id: number;
  warehouseId: number;
  regalId: number;
  children: React.ReactNode;
}

export const WarehouseRegalPositionProvider = ({
  id,
  warehouseId,
  regalId,
  children,
}: IWarehouseRegalPositionProvider) => {
  const getRegalPosition = React.useMemo(() => makeGetRegalPositionById(id), [
    id,
  ]);
  const regalPosition = useSelector(getRegalPosition);

  return (
    <WarehouseRegalPositionContext.Provider
      value={{
        regalPosition,
        warehouseId,
        regalId,
      }}
    >
      {children}
    </WarehouseRegalPositionContext.Provider>
  );
};
