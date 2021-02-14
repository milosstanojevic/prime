import { request } from "../../../api";
import { AppDispatch, AppThunk } from "../../../app";
import { WarehouseArticle } from "../types";
import { schemas } from "../schemas";
import { warehouseArticleSlice } from "../slices";

export interface NormalizerWarehouseArticlesRequest {
  result: number[];
  entities: {
    warehouse_articles: { [id: number]: WarehouseArticle },
  };
}

export interface NormalizerWarehouseArticleRequest {
  result: number;
  entities: {
    warehouse_articles: { [id: number]: WarehouseArticle },
  };
}

const getPayload = (warehouseArticle: WarehouseArticle) => {
  return {
    article_id: warehouseArticle.articleId,
    regal_id: warehouseArticle.regalId,
    regal_position_id: warehouseArticle.regalPositionId,
  }
}

const { actions } = warehouseArticleSlice

export const addWarehouseArticle = (id: number, newWarehouseArticle: WarehouseArticle): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const response: Object = await request(`warehouses/${id}/article`, {
      schema: schemas.WAREHOUSE_ARTICLE,
      method: 'POST',
      payload: getPayload(newWarehouseArticle),
    })
    dispatch(actions.addWarehouseArticle(response as NormalizerWarehouseArticleRequest))
  } catch (error) {
    dispatch(actions.hasError())
  }
}

export const fetchWarehouseArticles = (id: number): AppThunk => async (dispatch:AppDispatch) => {
  dispatch(actions.startLoading())
  try {
    const response: Object = await request(`warehouses/${id}/articles`, {schema: schemas.WAREHOUSE_ARTICLES})
    dispatch(actions.warehouseArticleSuccess(response as NormalizerWarehouseArticlesRequest))
  } catch (error) {
    dispatch(actions.hasError())
  }
}

export const fetchWarehouseRegalArticles = (id: number, regalId: number): AppThunk => async (dispatch:AppDispatch) => {
  dispatch(actions.startLoading())
  try {
    const response: Object = await request(`warehouses/${id}/regals/${regalId}/articles`, {schema: schemas.WAREHOUSE_ARTICLES})
    dispatch(actions.warehouseArticleSuccess(response as NormalizerWarehouseArticlesRequest))
  } catch (error) {
    dispatch(actions.hasError())
  }
}
