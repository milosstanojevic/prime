import { combineReducers } from '@reduxjs/toolkit'
import { warehouseSlice } from "../features/warehouses";
import { articleSlice } from "../features/articles";
import { warehouseArticleSlice } from "../features/warehouse_articles";
import { warehouseRegalSlice } from "../features/warehouse_regals";
import { regalPositionSlice } from "../features/warehouse_regal_positions";
import { transportSlice } from "../features/transports";

const rootReducer = combineReducers({
  warehouses: warehouseSlice.reducer,
  articles: articleSlice.reducer,
  warehouse_articles: warehouseArticleSlice.reducer,
  regals: warehouseRegalSlice.reducer,
  regal_positions: regalPositionSlice.reducer,
  transports: transportSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
