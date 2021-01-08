import { combineReducers } from '@reduxjs/toolkit'
import { warehouseSlice } from "../features/warehouses";

const rootReducer = combineReducers({
  warehouses: warehouseSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
