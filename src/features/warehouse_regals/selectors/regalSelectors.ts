import { RootState } from "../../../app";
import { createSelector } from "@reduxjs/toolkit";

export const getAllRegals = (state: RootState) => state.regals.items;

export const makeGetRegalsByWarehouseId = (id: number) => {
  return createSelector(getAllRegals, (regals) => {
    return regals.filter((regal) => regal?.warehouseId === id);
  });
};
