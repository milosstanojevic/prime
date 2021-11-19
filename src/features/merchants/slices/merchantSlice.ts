import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  NormalizerMerchantRequest,
  NormalizerMerchantsRequest,
} from "../actions";
import { Merchant } from "../types";
import { entitiesSuccess, entitySuccess, entityIdsSuccess } from "../../utils";

interface IMerchantReducer {
  items: Array<Merchant>;
  itemIds: Array<number>;
  isLoading: boolean;
  error: boolean;
}

const initialState: IMerchantReducer = {
  items: [],
  itemIds: [],
  isLoading: false,
  error: false,
};

export const merchantSlice = createSlice({
  name: "merchants",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    hasError: (state) => {
      state.error = true;
      state.isLoading = false;
    },
    merchantsSuccess: (
      state,
      { payload }: PayloadAction<NormalizerMerchantsRequest>
    ) => {
      state.items = entitiesSuccess(payload.entities.merchants);
      state.itemIds = payload.result;
      state.isLoading = false;
    },
    merchantSuccess: (
      state,
      { payload }: PayloadAction<NormalizerMerchantRequest>
    ) => {
      state.items = entitySuccess(
        state.items,
        payload.result,
        payload.entities.merchants
      );
      state.itemIds = entityIdsSuccess(state.itemIds, payload.result);
      state.isLoading = false;
    },
    clearAllMerchants: (state) => {
      state.items = [];
    },
  },
});
