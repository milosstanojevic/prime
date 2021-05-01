import { AppDispatch, AppThunk } from "../../../app";
import { TransportOrderArticle } from "../types";
import { request } from "../../../api";
import { schemas } from "../schemas"
import { transportOrderArticleSlice } from "../slices";

export interface NormalizerTransportOrderArticlesRequest {
  result: number[];
  entities: {
    transport_order_articles: { [id: number]: TransportOrderArticle },
  };
}

export interface NormalizerTransportOrderArticleRequest {
  result: number;
  entities: {
    transport_order_articles: { [id: number]: TransportOrderArticle },
  };
}

const getPayload = (attributes: TransportOrderArticle) => {
  return {
    transport_order_id: attributes.transportOrderId,
    article_id: attributes.articleId,
    quantity: attributes.quantity,
  }
}

const { actions } = transportOrderArticleSlice

export const addTransportOrder = (id: number, attributes: TransportOrderArticle): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const response: Object = await request(`/transport-orders/${id}/articles`, {
      schema: schemas.TRANSPORT_ORDER_ARTICLE,
      method: 'POST',
      payload: getPayload(attributes),
    })
    dispatch(actions.transportOrderArticleSuccess(response as NormalizerTransportOrderArticleRequest))
  } catch (error) {
    dispatch(actions.hasError())
  }
}

export const fetchTransportOrders = (id: number): AppThunk => async (dispatch:AppDispatch) => {
  dispatch(actions.startLoading())
  try {
    const response: Object = await request(`/transport-orders/${id}/articles`, {
      schema: schemas.TRANSPORT_ORDER_ARTICLES
    })
    dispatch(actions.transportOrderArticlesSuccess(response as NormalizerTransportOrderArticlesRequest))
  } catch (error) {
    dispatch(actions.hasError())
  }
}

export const fetchTransportOrder = (id: number, articleId: number): AppThunk => async (dispatch:AppDispatch) => {
  dispatch(actions.startLoading())
  try {
    const response: Object = await request(`/transport-orders/${id}/articles/${articleId}`, {
      schema: schemas.TRANSPORT_ORDER_ARTICLE
    })
    dispatch(actions.transportOrderArticleSuccess(response as NormalizerTransportOrderArticleRequest))
  } catch (error) {
    dispatch(actions.hasError())
  }
}

export const updateTransportOrder = (id: number, articleId: number, attributes: TransportOrderArticle): AppThunk => async (dispatch:AppDispatch) => {
  try {
    const response: Object = await request(`/transport-orders/${id}/articles/${articleId}`, {
      schema: schemas.TRANSPORT_ORDER_ARTICLE,
      method: 'PUT',
      payload: getPayload(attributes),
    })
    dispatch(actions.transportOrderArticleSuccess(response as NormalizerTransportOrderArticleRequest))
  } catch (error) {
    dispatch(actions.hasError())
  }
}

export const deleteTransportOrder = (id: number, articleId: number): AppThunk => async (dispatch:AppDispatch) => {
  try {
    const response: Object = await request(`/transport-orders/${id}/articles/${articleId}`, {
      schema: schemas.TRANSPORT_ORDER_ARTICLE,
      method: 'DELETE',
    })
    dispatch(actions.transportOrderArticleRemoved(response as NormalizerTransportOrderArticleRequest))
  } catch (error) {
    dispatch(actions.hasError())
  }
}

export const clearTransportOrderArticles = () => (dispatch: AppDispatch) => {
  dispatch(actions.clearTransportOrderArticles())
}
