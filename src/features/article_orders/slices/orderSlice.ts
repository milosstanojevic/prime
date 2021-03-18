import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NormalizerOrderRequest, NormalizerOrdersRequest } from "../actions";
import { Order } from "../types";
import { entitiesSuccess, entitySuccess } from "../../utils";

interface IOrderReducer {
  items: Array<Order>,
  isLoading: boolean,
  error: boolean,
}

const initialState: IOrderReducer = {
  items: [],
  isLoading: false,
  error: false,
}

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true
    },
    hasError: (state) => {
      state.error = true
      state.isLoading = false
    },
    ordersSuccess: (state, { payload }: PayloadAction<NormalizerOrdersRequest>) => {
      state.items = entitiesSuccess(payload.entities.orders)
      state.isLoading = false;
    },
    orderSuccess: (state, { payload }: PayloadAction<NormalizerOrderRequest>) => {
      state.items = entitySuccess(state.items, payload.result, payload.entities.orders)
      state.isLoading = false
    },
  }
});
