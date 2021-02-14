import { RootState } from "../../../app";
import {createSelector} from "@reduxjs/toolkit";

export const getAllWarehouses = (state: RootState) => state.warehouses.items

export const makeGetWarehouseById = () => {
  return createSelector(
    getAllWarehouses,
    (state: RootState, id: number) => id,
    (warehouses, id) => {
      const warehouse = warehouses.find((warehouse) => warehouse.id === id)
      return {
        ...warehouse
      }
    }
  )
}
