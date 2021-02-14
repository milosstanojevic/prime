import { RootState } from "../../../app";
import { createSelector } from "@reduxjs/toolkit";
import { Regal } from "../types";

export const getAllRegals = (state: RootState) => state.regals.items

export const makeGetRegalsByWarehouseId = () => {
  return createSelector(
    getAllRegals,
    (state: RootState, id: number) => id,
    (regals, id) => {
      let data: Regal[] = []

      regals.forEach(regal => {
        if (regal && regal.warehouseId === id) {
          data.push(regal)
        }
      })

      return data
    }
  )
}
