import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NormalizerTransportsRequest, NormalizerTransportRequest } from "../actions";
import { Transport } from "../types";

interface ITransportReducer {
  items: Array<Transport>,
  isLoading: boolean,
  error: boolean,
}

const initialState: ITransportReducer = {
  items: [],
  isLoading: false,
  error: false,
}

export const transportSlice = createSlice({
  name: 'transports',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true
    },
    transportSuccess: (state, { payload }: PayloadAction<NormalizerTransportsRequest>) => {
      state.items = Object.values(payload.entities.transports)
      state.isLoading = false;
    },
    hasError: (state) => {
      state.error = true
      state.isLoading = false
    },
    addTransport: (state, { payload }: PayloadAction<NormalizerTransportRequest>) => {
      const transportId = payload.result
      const transport = payload.entities.transports[transportId]
      state.items.push(transport)
      state.isLoading = false
    },
  }
});
