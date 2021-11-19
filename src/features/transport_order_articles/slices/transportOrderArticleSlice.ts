import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  NormalizerTransportOrderArticleRequest,
  NormalizerTransportOrderArticlesRequest,
} from "../actions";
import { TransportOrderArticle } from "../types";
import {
  entitiesSuccess,
  entitySuccess,
  entityRemove,
  entityIdsSuccess,
  entityIdsRemove,
} from "../../utils";

interface ITransportOrderArticleReducer {
  items: Array<TransportOrderArticle>;
  itemIds: Array<number>;
  isLoading: boolean;
  error: boolean;
}

const initialState: ITransportOrderArticleReducer = {
  items: [],
  itemIds: [],
  isLoading: false,
  error: false,
};

export const transportOrderArticleSlice = createSlice({
  name: "transport_order_articles",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    hasError: (state) => {
      state.error = true;
      state.isLoading = false;
    },
    transportOrderArticlesSuccess: (
      state,
      { payload }: PayloadAction<NormalizerTransportOrderArticlesRequest>
    ) => {
      state.items = entitiesSuccess(payload.entities.transport_order_articles);
      state.itemIds = payload.result;
      state.isLoading = false;
    },
    transportOrderArticleSuccess: (
      state,
      { payload }: PayloadAction<NormalizerTransportOrderArticleRequest>
    ) => {
      state.items = entitySuccess(
        state.items,
        payload.result,
        payload.entities.transport_order_articles
      );
      state.itemIds = entityIdsSuccess(state.itemIds, payload.result);
      state.isLoading = false;
    },
    transportOrderArticleRemoved: (
      state,
      { payload }: PayloadAction<NormalizerTransportOrderArticleRequest>
    ) => {
      state.items = entityRemove(state.items, payload.result);
      state.itemIds = entityIdsRemove(state.itemIds, payload.result);
      state.isLoading = false;
    },
    clearTransportOrderArticles: (state) => {
      state.items = [];
    },
  },
});
