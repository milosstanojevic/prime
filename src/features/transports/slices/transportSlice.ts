import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  NormalizerTransportsRequest,
  NormalizerTransportRequest,
} from "../actions";
import { Transport } from "../types";
import { entitiesSuccess, entitySuccess, entityIdsSuccess } from "../../utils";

interface ITransportReducer {
  items: Array<Transport>;
  itemIds: Array<number>;
  isLoading: boolean;
  error: boolean;
}

const initialState: ITransportReducer = {
  items: [],
  itemIds: [],
  isLoading: false,
  error: false,
};

export const transportSlice = createSlice({
  name: "transports",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    hasError: (state) => {
      state.error = true;
      state.isLoading = false;
    },
    transportsSuccess: (
      state,
      { payload }: PayloadAction<NormalizerTransportsRequest>
    ) => {
      state.items = entitiesSuccess(payload.entities.transports);
      state.itemIds = payload.result;
      state.isLoading = false;
    },
    transportSuccess: (
      state,
      { payload }: PayloadAction<NormalizerTransportRequest>
    ) => {
      state.items = entitySuccess(
        state.items,
        payload.result,
        payload.entities.transports
      );
      state.itemIds = entityIdsSuccess(state.itemIds, payload.result);
      state.isLoading = false;
    },
    clearTransports: (state) => {
      state.items = [];
    },
  },
});
