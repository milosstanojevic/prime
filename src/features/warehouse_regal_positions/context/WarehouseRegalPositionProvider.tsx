import { Article } from "features/articles/types";
import { WarehouseArticle } from "features/warehouse_articles/types";
import React from "react";
import { RegalPosition } from "../types";

type WarehouseRegalPositionContextType = {
  regalPosition: RegalPosition;
  warehouseId: number;
  regalId: number;
  articles?: Article[];
  warehouseArticles?: WarehouseArticle[];
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
  regalPosition: RegalPosition;
  warehouseId: number;
  regalId: number;
  articles?: Article[];
  warehouseArticles?: WarehouseArticle[];
  children: React.ReactNode;
}

export const WarehouseRegalPositionProvider = ({
  regalPosition,
  warehouseId,
  regalId,
  articles,
  warehouseArticles,
  children,
}: IWarehouseRegalPositionProvider) => {
  return (
    <WarehouseRegalPositionContext.Provider
      value={{
        regalPosition,
        warehouseId,
        regalId,
        articles,
        warehouseArticles,
      }}
    >
      {children}
    </WarehouseRegalPositionContext.Provider>
  );
};
