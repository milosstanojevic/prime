import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NormalizerMerchantRequest, NormalizerMerchantsRequest } from "../actions";
import { Merchant } from "../types";
import { entitiesSuccess, entitySuccess } from "../../utils";

interface IMerchantReducer {
  items: Array<Merchant>,
  isLoading: boolean,
  error: boolean,
}

const initialState: IMerchantReducer = {
  items: [],
  isLoading: false,
  error: false,
}

export const merchantSlice = createSlice({
  name: 'merchants',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true
    },
    hasError: (state) => {
      state.error = true
      state.isLoading = false
    },
    merchantsSuccess: (state, { payload }: PayloadAction<NormalizerMerchantsRequest>) => {
      state.items = entitiesSuccess(payload.entities.merchants)
      state.isLoading = false;
    },
    merchantSuccess: (state, { payload }: PayloadAction<NormalizerMerchantRequest>) => {
      state.items = entitySuccess(state.items, payload.result, payload.entities.merchants)
      state.isLoading = false
    },
  }
});
