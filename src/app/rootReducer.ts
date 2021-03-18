import { combineReducers } from '@reduxjs/toolkit'
import { warehouseSlice } from "../features/warehouses";
import { articleSlice } from "../features/articles";
import { warehouseArticleSlice } from "../features/warehouse_articles";
import { warehouseRegalSlice } from "../features/warehouse_regals";
import { regalPositionSlice } from "../features/warehouse_regal_positions";
import { transportSlice } from "../features/transports";
import { merchantSlice } from "../features/merchants";
import { orderSlice } from "../features/article_orders";
import { userSlice } from "../features/users";
import { merchantArticleSlice } from "../features/merchant_articles";

const rootReducer = combineReducers({
  warehouses: warehouseSlice.reducer,
  articles: articleSlice.reducer,
  warehouse_articles: warehouseArticleSlice.reducer,
  regals: warehouseRegalSlice.reducer,
  regal_positions: regalPositionSlice.reducer,
  transports: transportSlice.reducer,
  merchants: merchantSlice.reducer,
  orders: orderSlice.reducer,
  users: userSlice.reducer,
  merchant_articles: merchantArticleSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
