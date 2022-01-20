import { RootState } from "../../../app";
import { createSelector } from "@reduxjs/toolkit";

export const getAllTransportOrders = (state: RootState) =>
  state.transport_orders.items;
export const getTransportOrderIds = (state: RootState) =>
  state.transport_orders.itemIds;

export const makeGetParentTransportOrders = (parent: string, id: number) => {
  return createSelector(getAllTransportOrders, (transportOrders) => {
    return transportOrders.filter(
      (item) => item.parent === parent && item.parentId === id
    );
  });
};

export const makeGetTransportOrderById = (id: number) => {
  return createSelector(getAllTransportOrders, (transportOrders) => {
    const order = transportOrders.find(
      (transportOrder) => transportOrder.id === id
    );
    if (order) {
      return { ...order };
    }
    return {};
  });
};
