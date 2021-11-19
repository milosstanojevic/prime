import { RootState } from "../../../app";
import { createSelector } from "@reduxjs/toolkit";
import { Warehouse } from "../types";

export const getAllWarehouses = (state: RootState) => state.warehouses.items;
export const getWarehouseIds = (state: RootState) => state.warehouses.itemIds;

const defaultWarehouse: Warehouse = {
  id: 0,
  name: "",
  description: "",
  address: "",
  updatedAt: undefined,
  createdAt: undefined,
  updatedBy: undefined,
  createdBy: undefined,
};

export const makeGetWarehouseById = (id?: number) => {
  return createSelector(getAllWarehouses, (warehouses) => {
    const warehouse = warehouses.find((warehouse) => warehouse.id === id);
    if (!warehouse) {
      return defaultWarehouse;
    }
    return {
      ...warehouse,
    };
  });
};
