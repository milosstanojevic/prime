import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  NormalizerArticleRequest,
  NormalizerArticlesRequest,
} from "../actions";
import { Article } from "../types";
import { entitiesSuccess, entitySuccess, entityRemove } from "../../utils";

interface IArticleReducer {
  items: Array<Article>;
  isLoading: boolean;
  error: boolean;
}

const initialState: IArticleReducer = {
  items: [],
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
      state.isLoading = false;
    },
    deleteArticle: (state, { payload }) => {
      state.items = entityRemove(state.items, payload);
    },
  },
});
