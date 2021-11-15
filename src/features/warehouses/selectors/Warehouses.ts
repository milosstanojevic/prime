import { RootState } from "../../../app";
import { createSelector } from "@reduxjs/toolkit";

export const getAllWarehouses = (state: RootState) => state.warehouses.items;

export const makeGetWarehouseById = (id?: number) => {
  return createSelector(getAllWarehouses, (warehouses) => {
    const warehouse = warehouses.find((warehouse) => warehouse.id === id);
    if (!warehouse) {
      throw Error(`Warehouse with id=${id} not found`);
    }
    return {
      ...warehouse,
    };
  });
};
