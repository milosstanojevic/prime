import { RootState } from "../../../app";
import {createSelector} from "@reduxjs/toolkit";

export const getAllTransportOrders = (state: RootState) => state.transport_orders.items

export const makeGetTransportOrderById = () => {
  return createSelector(
    getAllTransportOrders,
    (state: RootState, id: number) => id,
    (transportOrders, id) => {
      const order = transportOrders.find((transportOrder) => transportOrder.id === id)
      if (order) {
        return { ...order }
      }
      return {}
    }
  )
}
