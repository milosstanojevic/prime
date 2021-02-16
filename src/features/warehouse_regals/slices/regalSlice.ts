import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NormalizerRegalsRequest, NormalizerRegalRequest } from "../actions";
import { Regal } from "../types";

interface IWarehouseRegalReducer {
  items: Array<Regal>,
  isLoading: boolean,
  error: boolean,
}

const initialState: IWarehouseRegalReducer = {
  items: [],
  isLoading: false,
  error: false,
}

export const warehouseRegalSlice = createSlice({
  name: 'regals',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true
    },
    warehouseRegalSuccess: (state, { payload }: PayloadAction<NormalizerRegalsRequest>) => {
      state.items = Object.values(payload.entities.regals)
      state.isLoading = false;
    },
    hasError: (state) => {
      state.error = true
      state.isLoading = false
    },
    addWarehouseRegal: (state, { payload }: PayloadAction<NormalizerRegalRequest>) => {
      const regalId = payload.result
      const regal = payload.entities.regals[regalId]
      state.items.push(regal)
      state.isLoading = false
    },
    clearWarehouseRegals: (state) => {
      state.items = []
    }
  }
});
