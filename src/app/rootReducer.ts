import { combineReducers } from '@reduxjs/toolkit'
import { warehouseSlice } from "../features/warehouses";
import { articleSlice } from "../features/articles";
import { warehouseArticleSlice } from "../features/warehouse_articles";
import { warehouseRegalSlice } from "../features/warehouse_regals";
import { regalPositionSlice } from "../features/warehouse_regal_positions";
import { transportSlice } from "../features/transports";
import { merchantSlice } from "../features/merchants";
import { transportOrderSlice } from "../features/transport_orders";
import { userSlice } from "../features/users";
import { merchantArticleSlice } from "../features/merchant_articles";
import { transportOrderArticleSlice } from "../features/transport_order_articles";
import { transportDestinationArticleSlice } from "../features/transport_destination_articles";

const rootReducer = combineReducers({
  articles: articleSlice.reducer,
  warehouses: warehouseSlice.reducer,
  warehouse_articles: warehouseArticleSlice.reducer,
  merchants: merchantSlice.reducer,
  merchant_articles: merchantArticleSlice.reducer,
  regals: warehouseRegalSlice.reducer,
  regal_positions: regalPositionSlice.reducer,
  transports: transportSlice.reducer,
  transport_destination_articles: transportDestinationArticleSlice.reducer,
  transport_orders: transportOrderSlice.reducer,
  transport_order_articles: transportOrderArticleSlice.reducer,
  users: userSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
