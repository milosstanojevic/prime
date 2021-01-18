import { combineReducers } from '@reduxjs/toolkit'
import { warehouseSlice } from "../features/warehouses";
import {articleSlice} from "../features/articles";

const rootReducer = combineReducers({
  warehouses: warehouseSlice.reducer,
  articles: articleSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
