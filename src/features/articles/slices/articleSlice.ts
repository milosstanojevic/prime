import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  NormalizerArticleRequest,
  NormalizerArticlesRequest,
} from "../actions";
import { Article } from "../types";
import {
  entitiesSuccess,
  entitySuccess,
  entityRemove,
  entityIdsSuccess,
  entityIdsRemove,
} from "../../utils";

interface IArticleReducer {
  items: Array<Article>;
  itemIds: Array<number>;
  isLoading: boolean;
  error: boolean;
}

const initialState: IArticleReducer = {
  items: [],
  itemIds: [],
  isLoading: false,
  error: false,
};

export const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    hasError: (state) => {
      state.error = true;
      state.isLoading = false;
    },
    articlesSuccess: (
      state,
      { payload }: PayloadAction<NormalizerArticlesRequest>
    ) => {
      state.items = entitiesSuccess(payload.entities.articles);
      state.itemIds = payload.result;
      state.isLoading = false;
    },
    articleSuccess: (
      state,
      { payload }: PayloadAction<NormalizerArticleRequest>
    ) => {
      state.items = entitySuccess(
        state.items,
        payload.result,
        payload.entities.articles
      );
      state.itemIds = entityIdsSuccess(state.itemIds, payload.result);
      state.isLoading = false;
    },
    deleteArticle: (state, { payload }) => {
      state.items = entityRemove(state.items, payload);
      state.itemIds = entityIdsRemove(state.itemIds, payload);
    },
  },
});
