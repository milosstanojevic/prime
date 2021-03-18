import { RootState } from "../../../app";
import {createSelector} from "@reduxjs/toolkit";

export const getAllOrders = (state: RootState) => state.orders.items

export const makeGetOrderById = () => {
  return createSelector(
    getAllOrders,
    (state: RootState, id: number) => id,
    (orders, id) => {
      const order = orders.find((order) => order.id === id)
      if (order) {
        return { ...order }
      }
      return {}
    }
  )
}
