import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NormalizerRegalPositionRequest, NormalizerRegalPositionsRequest } from "../actions";
import { RegalPosition } from "../types";

interface IRegalPositionsReducer {
  items: Array<RegalPosition>,
  isLoading: boolean,
  error: boolean,
}

const initialState: IRegalPositionsReducer = {
  items: [],
  isLoading: false,
  error: false,
}

export const regalPositionSlice = createSlice({
  name: 'regal_positions',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true
    },
    regalPositionSuccess: (state, { payload }: PayloadAction<NormalizerRegalPositionsRequest>) => {
      state.items = Object.values(payload.entities.regal_positions)
      state.isLoading = false;
    },
    hasError: (state) => {
      state.error = true
      state.isLoading = false
    },
    addRegalPosition: (state, { payload }: PayloadAction<NormalizerRegalPositionRequest>) => {
      const regalPositionId = payload.result
      const regalPosition = payload.entities.regal_positions[regalPositionId]
      state.items.push(regalPosition)
      state.isLoading = false
    },
  }
});
