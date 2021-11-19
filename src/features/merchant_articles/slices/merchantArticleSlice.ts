import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  NormalizerMerchantArticleRequest,
  NormalizerMerchantArticlesRequest,
} from "../actions";
import { MerchantArticle } from "../types";
import {
  entitiesSuccess,
  entitySuccess,
  entityRemove,
  entityIdsSuccess,
  entityIdsRemove,
} from "../../utils";

interface IMerchantArticleReducer {
  items: Array<MerchantArticle>;
  itemIds: Array<number>;
  isLoading: boolean;
  error: boolean;
}

const initialState: IMerchantArticleReducer = {
  items: [],
  itemIds: [],
  isLoading: false,
  error: false,
};

export const merchantArticleSlice = createSlice({
  name: "merchant_articles",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    hasError: (state) => {
      state.error = true;
      state.isLoading = false;
    },
    merchantArticlesSuccess: (
      state,
      { payload }: PayloadAction<NormalizerMerchantArticlesRequest>
    ) => {
      state.items = entitiesSuccess(payload.entities.merchant_articles);
      state.itemIds = payload.result;
      state.isLoading = false;
    },
    merchantArticleSuccess: (
      state,
      { payload }: PayloadAction<NormalizerMerchantArticleRequest>
    ) => {
      state.items = entitySuccess(
        state.items,
        payload.result,
        payload.entities.merchant_articles
      );
      state.itemIds = entityIdsSuccess(state.itemIds, payload.result);
      state.isLoading = false;
    },
    merchantArticleRemoved: (
      state,
      { payload }: PayloadAction<NormalizerMerchantArticleRequest>
    ) => {
      state.items = entityRemove(state.items, payload.result);
      state.itemIds = entityIdsRemove(state.itemIds, payload.result);
      state.isLoading = false;
    },
    clearMerchantArticles: (state) => {
      state.items = [];
    },
  },
});
