import { request } from "../../../api";
import { AppDispatch, AppThunk } from "../../../app";
import { TransportDestinationArticle } from "../types";
import { schemas } from "../schemas";
import { transportDestinationArticleSlice } from "../slices";

export interface NormalizerTransportDestinationArticlesRequest {
  result: number[];
  entities: {
    transport_destination_articles: { [id: number]: TransportDestinationArticle },
  };
}

export interface NormalizerTransportDestinationArticleRequest {
  result: number;
  entities: {
    transport_destination_articles: { [id: number]: TransportDestinationArticle },
  };
}

const getPayload = (attributes: TransportDestinationArticle) => {
  return {
    warehouse_id: attributes.warehouseId,
    article_id: attributes.articleId,
    transport_destination_id: attributes.transportDestinationId,
    regal_id: attributes.regalId,
    regal_position_id: attributes.regalPositionId,
    quantity: attributes.quantity,
  }
}

const { actions } = transportDestinationArticleSlice

export const fetchTransportDestinationArticles = (id: number): AppThunk => async (dispatch:AppDispatch) => {
  dispatch(actions.startLoading())
  try {
    const response: Object = await request(`transport-destinations/${id}/articles`, {
      schema: schemas.TRANSPORT_DESTINATION_ARTICLES
    })
    dispatch(actions.transportDestinationArticlesSuccess(response as NormalizerTransportDestinationArticlesRequest))
  } catch (error) {
    dispatch(actions.hasError())
  }
}

export const addTransportDestinationArticle = (id: number, attributes: TransportDestinationArticle): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const response: Object = await request(`transport-destinations/${id}/articles`, {
      schema: schemas.TRANSPORT_DESTINATION_ARTICLE,
      method: 'POST',
      payload: getPayload(attributes),
    })
    dispatch(actions.transportDestinationArticleSuccess(response as NormalizerTransportDestinationArticleRequest))
  } catch (error) {
    dispatch(actions.hasError())
  }
}

export const updateTransportDestinationArticle = (id: number, articleId: number, attributes: TransportDestinationArticle): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const response: Object = await request(`transport-destinations/${id}/articles/${articleId}`, {
      schema: schemas.TRANSPORT_DESTINATION_ARTICLE,
      method: 'PUT',
      payload: getPayload(attributes),
    })
    dispatch(actions.transportDestinationArticleSuccess(response as NormalizerTransportDestinationArticleRequest))
  } catch (error) {
    dispatch(actions.hasError())
  }
}

export const deleteTransportDestinationArticle = (id: number, articleId: number): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const response: Object = await request(`transport-destinations/${id}/articles/${articleId}`, {
      schema: schemas.TRANSPORT_DESTINATION_ARTICLE,
      method: 'DELETE',
    })
    dispatch(actions.transportDestinationArticleRemoved(response as NormalizerTransportDestinationArticleRequest))
  } catch (error) {
    dispatch(actions.hasError())
  }
}

export const clearTransportDestinationArticles = () => (dispatch: AppDispatch) => {
  dispatch(actions.clearTransportDestinationArticles())
}
