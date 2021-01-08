import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { Warehouse } from 'features/warehouses/types';
import {NormalizerWarehouseRequest, NormalizerWarehousesRequest} from "../actions";

interface IWarehouseReducer {
  items: Array<Warehouse>,
  isLoading: boolean,
  error: boolean,
}

const initialState: IWarehouseReducer = {
  items: [],
  isLoading: false,
  error: false,
}

export const warehouseSlice = createSlice({
  name: 'warehouses',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true
    },
    warehousesSuccess: (state, { payload }: PayloadAction<NormalizerWarehousesRequest>) => {
      state.items = Object.values(payload.entities.warehouses)
      state.isLoading = false;
    },
    hasError: (state) => {
      state.error = true
      state.isLoading = false
    },
    addWarehouse: (state, { payload }: PayloadAction<NormalizerWarehouseRequest>) => {
      const warehouseId = payload.result
      const warehouse = payload.entities.warehouses[warehouseId]
      state.items.push(warehouse)
      state.isLoading = false
    },
  }
});
