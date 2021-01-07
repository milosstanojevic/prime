import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Warehouse } from 'features/warehouses/types';

const initialState : Warehouse[] = [];

const warehouseSlice = createSlice({
  name: 'warehouses',
  initialState,
  reducers: {
    addWarehouse(state, action: PayloadAction<Warehouse>) {
      state.push(action.payload);
    },
  }
});

export default warehouseSlice;
