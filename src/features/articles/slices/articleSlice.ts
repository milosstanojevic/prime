import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import {NormalizerArticleRequest, NormalizerArticlesRequest} from "../actions";
import {Article} from "../types";

interface IArticleReducer {
  items: Array<Article>,
  isLoading: boolean,
  error: boolean,
}

const initialState: IArticleReducer = {
  items: [],
  isLoading: false,
  error: false,
}

export const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true
    },
    articlesSuccess: (state, { payload }: PayloadAction<NormalizerArticlesRequest>) => {
      state.items = Object.values(payload.entities.articles)
      state.isLoading = false;
    },
    hasError: (state) => {
      state.error = true
      state.isLoading = false
    },
    addArticle: (state, { payload }: PayloadAction<NormalizerArticleRequest>) => {
      const articleId = payload.result
      const article = payload.entities.articles[articleId]
      state.items.push(article)
      state.isLoading = false
    },
  }
});
