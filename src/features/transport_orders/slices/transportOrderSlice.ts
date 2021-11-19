import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  NormalizerTransportOrderRequest,
  NormalizerTransportOrdersRequest,
} from "../actions";
import { TransportOrder } from "../types";
import { entitiesSuccess, entitySuccess, entityIdsSuccess } from "../../utils";

interface ITransportOrderReducer {
  items: Array<TransportOrder>;
  itemIds: Array<number>;
  isLoading: boolean;
  error: boolean;
}

const initialState: ITransportOrderReducer = {
  items: [],
  itemIds: [],
  isLoading: false,
  error: false,
};

export const transportOrderSlice = createSlice({
  name: "transport_orders",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    hasError: (state) => {
      state.error = true;
      state.isLoading = false;
    },
    transportOrdersSuccess: (
      state,
      { payload }: PayloadAction<NormalizerTransportOrdersRequest>
    ) => {
      state.items = entitiesSuccess(payload.entities.transport_orders);
      state.itemIds = payload.result;
      state.isLoading = false;
    },
    transportOrderSuccess: (
      state,
      { payload }: PayloadAction<NormalizerTransportOrderRequest>
    ) => {
      state.items = entitySuccess(
        state.items,
        payload.result,
        payload.entities.transport_orders
      );
      state.itemIds = entityIdsSuccess(state.itemIds, payload.result);
      state.isLoading = false;
    },
    clearTransportOrders: (state) => {
      state.items = [];
    },
  },
});
