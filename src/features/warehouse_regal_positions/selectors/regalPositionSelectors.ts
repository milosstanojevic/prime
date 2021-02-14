import { RootState } from "../../../app";
import { createSelector } from "@reduxjs/toolkit";
import { RegalPosition } from "../types";

export const getAllRegalPositions = (state: RootState) => state.regal_positions.items

export const makeGetRegalPositionsByRegalId = () => {
  return createSelector(
    getAllRegalPositions,
    (state: RootState, id: number) => id,
    (regalPositions, id) => {
      let data: RegalPosition[] = []

      Object.values(regalPositions).forEach(regalPosition => {
        if (regalPosition && regalPosition.regalId === id) {
          data.push(regalPosition)
        }
      })

      return data
    }
  )
}
