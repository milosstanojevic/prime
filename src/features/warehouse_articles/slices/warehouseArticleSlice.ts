import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NormalizerWarehouseArticleRequest, NormalizerWarehouseArticlesRequest } from "../actions";
import { WarehouseArticle } from "../types";
import { entitiesSuccess, entitySuccess } from "../../utils";

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
    hasError: (state) => {
      state.error = true
      state.isLoading = false
    },
    warehouseArticlesSuccess: (state, { payload }: PayloadAction<NormalizerWarehouseArticlesRequest>) => {
      state.items = entitiesSuccess(payload.entities.warehouse_articles)
      state.isLoading = false;
    },
    addWarehouseArticle: (state, { payload }: PayloadAction<NormalizerWarehouseArticleRequest>) => {
      state.items = entitySuccess(state.items, payload.result, payload.entities.warehouse_articles)
      state.isLoading = false
    },
    clearWarehouseArticles: (state) => {
      state.items = []
    }
  }
});
