import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NormalizerTransportDestinationArticleRequest, NormalizerTransportDestinationArticlesRequest } from "../actions";
import { TransportDestinationArticle } from "../types";
import { entitiesSuccess, entitySuccess, entityRemove } from "../../utils";

interface ITransportDestinationArticleReducer {
  items: Array<TransportDestinationArticle>,
  isLoading: boolean,
  error: boolean,
}

const initialState: ITransportDestinationArticleReducer = {
  items: [],
  isLoading: false,
  error: false,
}

export const transportDestinationArticleSlice = createSlice({
  name: 'transport_destination_articles',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true
    },
    hasError: (state) => {
      state.error = true
      state.isLoading = false
    },
    transportDestinationArticlesSuccess: (state, { payload }: PayloadAction<NormalizerTransportDestinationArticlesRequest>) => {
      state.items = entitiesSuccess(payload.entities.transport_destination_articles)
      state.isLoading = false;
    },
    transportDestinationArticleSuccess: (state, { payload }: PayloadAction<NormalizerTransportDestinationArticleRequest>) => {
      state.items = entitySuccess(state.items, payload.result, payload.entities.transport_destination_articles)
      state.isLoading = false
    },
    transportDestinationArticleRemoved: (state, { payload }: PayloadAction<NormalizerTransportDestinationArticleRequest>) => {
      state.items = entityRemove(state.items, payload.result)
      state.isLoading = false
    },
    clearTransportDestinationArticles: (state) => {
      state.items = []
    }
  }
});
