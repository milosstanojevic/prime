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

const getPayload = (article: Article) => {
  return {
    id: article.id,
    name: article.name,
    description: article.description,
    bar_code: article.barCode,
    unit: article.unit,
  }
}

const { actions } = articleSlice

export const addArticle = (newArticle: Article): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const response: Object = await request('articles', {
      schema: schemas.ARTICLE,
      method: 'POST',
      payload: getPayload(newArticle),
    })
    dispatch(actions.addArticle(response as NormalizerArticleRequest))
  } catch (error) {
    dispatch(actions.hasError())
  }
}

export const editArticle = (id: number, newArticle: Article): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const response: Object = await request(`articles/${id}`, {
      schema: schemas.ARTICLE,
      method: 'PUT',
      payload: getPayload(newArticle),
    })
    dispatch(actions.editArticle(response as NormalizerArticleRequest))
  } catch (error) {
    dispatch(actions.hasError())
  }
}

export const deleteArticle = (id: number): AppThunk => async (dispatch: AppDispatch) => {
  try {
    await request(`articles/${id}`, {
      method: 'DELETE',
    })
    dispatch(actions.deleteArticle(id))
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
