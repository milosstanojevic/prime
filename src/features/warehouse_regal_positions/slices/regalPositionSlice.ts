import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  NormalizerRegalPositionRequest,
  NormalizerRegalPositionsRequest,
} from "../actions";
import { RegalPosition } from "../types";
import { entitiesSuccess, entitySuccess, entityIdsSuccess } from "../../utils";

interface IRegalPositionsReducer {
  items: Array<RegalPosition>;
  itemIds: Array<number>;
  isLoading: boolean;
  error: boolean;
}

const initialState: IRegalPositionsReducer = {
  items: [],
  itemIds: [],
  isLoading: false,
  error: false,
};

export const regalPositionSlice = createSlice({
  name: "regal_positions",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    hasError: (state) => {
      state.error = true;
      state.isLoading = false;
    },
    regalPositionSuccess: (
      state,
      { payload }: PayloadAction<NormalizerRegalPositionsRequest>
    ) => {
      state.items = entitiesSuccess(payload.entities.regal_positions);
      state.itemIds = payload.result;
      state.isLoading = false;
    },
    addRegalPosition: (
      state,
      { payload }: PayloadAction<NormalizerRegalPositionRequest>
    ) => {
      state.items = entitySuccess(
        state.items,
        payload.result,
        payload.entities.regal_positions
      );
      state.itemIds = entityIdsSuccess(state.itemIds, payload.result);
      state.isLoading = false;
    },
    clearRegalPositions: (state) => {
      state.items = [];
    },
  },
});
