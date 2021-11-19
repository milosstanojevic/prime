import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Warehouse } from "features/warehouses/types";
import {
  NormalizerWarehouseRequest,
  NormalizerWarehousesRequest,
} from "../actions";
import { entitiesSuccess, entitySuccess, entityIdsSuccess } from "../../utils";

interface IWarehouseReducer {
  items: Array<Warehouse>;
  itemIds: Array<number>;
  isLoading: boolean;
  error: boolean;
}

const initialState: IWarehouseReducer = {
  items: [],
  itemIds: [],
  isLoading: false,
  error: false,
};

export const warehouseSlice = createSlice({
  name: "warehouses",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    hasError: (state) => {
      state.error = true;
      state.isLoading = false;
    },
    warehousesSuccess: (
      state,
      { payload }: PayloadAction<NormalizerWarehousesRequest>
    ) => {
      state.items = entitiesSuccess(payload.entities.warehouses);
      state.itemIds = payload.result;
      state.isLoading = false;
    },
    warehouseSuccess: (
      state,
      { payload }: PayloadAction<NormalizerWarehouseRequest>
    ) => {
      state.items = entitySuccess(
        state.items,
        payload.result,
        payload.entities.warehouses
      );
      state.itemIds = entityIdsSuccess(state.itemIds, payload.result)
      state.isLoading = false;
    },
    clearAllWarehouses: (state) => {
      state.items = [];
    },
  },
});
