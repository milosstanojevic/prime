import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NormalizerWarehouseArticleRequest, NormalizerWarehouseArticlesRequest } from "../actions";
import { WarehouseArticle } from "../types";

interface IWarehouseArticleReducer {
  items: Array<WarehouseArticle>,
  isLoading: boolean,
  error: boolean,
}

const initialState: IWarehouseArticleReducer = {
  items: [],
  isLoading: false,
  error: false,
}

export const warehouseArticleSlice = createSlice({
  name: 'warehouse_articles',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true
    },
    warehouseArticleSuccess: (state, { payload }: PayloadAction<NormalizerWarehouseArticlesRequest>) => {
      state.items = Object.values(payload.entities.warehouse_articles)
      state.isLoading = false;
    },
    hasError: (state) => {
      state.error = true
      state.isLoading = false
    },
    addWarehouseArticle: (state, { payload }: PayloadAction<NormalizerWarehouseArticleRequest>) => {
      const warehouseArticleId = payload.result
      const warehouseArticle = payload.entities.warehouse_articles[warehouseArticleId]
      state.items.push(warehouseArticle)
      state.isLoading = false
    },
  }
});
