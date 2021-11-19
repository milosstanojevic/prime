import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NormalizerRegalsRequest, NormalizerRegalRequest } from "../actions";
import { Regal } from "../types";
import { entitiesSuccess, entitySuccess, entityIdsSuccess } from "../../utils";

interface IWarehouseRegalReducer {
  items: Array<Regal>;
  itemIds: Array<number>;
  isLoading: boolean;
  error: boolean;
}

const initialState: IWarehouseRegalReducer = {
  items: [],
  itemIds: [],
  isLoading: false,
  error: false,
};

export const warehouseRegalSlice = createSlice({
  name: "regals",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    hasError: (state) => {
      state.error = true;
      state.isLoading = false;
    },
    warehouseRegalSuccess: (
      state,
      { payload }: PayloadAction<NormalizerRegalsRequest>
    ) => {
      state.items = entitiesSuccess(payload.entities.regals);
      state.itemIds = payload.result;
      state.isLoading = false;
    },
    addWarehouseRegal: (
      state,
      { payload }: PayloadAction<NormalizerRegalRequest>
    ) => {
      state.items = entitySuccess(
        state.items,
        payload.result,
        payload.entities.regals
      );
      state.itemIds = entityIdsSuccess(state.itemIds, payload.result);
      state.isLoading = false;
    },
    clearWarehouseRegals: (state) => {
      state.items = [];
    },
  },
});
