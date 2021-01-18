import { AppDispatch, AppThunk } from "../../../app";
import { Article } from "../types";
import { articleSlice } from "../slices";
import { request } from "../../../api";
import { schemas } from "../schemas"

export interface NormalizerArticlesRequest {
  result: number[];
  entities: {
    articles: { [id: number]: Article },
  };
}

export interface NormalizerArticleRequest {
  result: number;
  entities: {
    articles: { [id: number]: Article },
  };
}

const { actions } = articleSlice

export const addArticle = (newArticle: Article): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const response: Object = await request('articles', {
      schema: schemas.ARTICLE,
      method: 'POST',
      payload: newArticle,
    })
    dispatch(actions.addArticle(response as NormalizerArticleRequest))
  } catch (error) {
    dispatch(actions.hasError())
  }
}

export const fetchArticles = (): AppThunk => async (dispatch:AppDispatch) => {
  dispatch(actions.startLoading())
  try {
    const response: Object = await request('articles', {schema: schemas.ARTICLES})
    dispatch(actions.articlesSuccess(response as NormalizerArticlesRequest))
  } catch (error) {
    dispatch(actions.hasError())
  }
}
