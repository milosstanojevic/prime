import { request } from "../../../api";
import { AppDispatch, AppThunk } from "../../../app";
import { MerchantArticle } from "../types";
import { schemas } from "../schemas";
import { merchantArticleSlice } from "../slices";

export interface NormalizerMerchantArticlesRequest {
  result: number[];
  entities: {
    merchant_articles: { [id: number]: MerchantArticle },
  };
}

export interface NormalizerMerchantArticleRequest {
  result: number;
  entities: {
    merchant_articles: { [id: number]: MerchantArticle },
  };
}

const getPayload = (merchantArticle: MerchantArticle) => {
  return {
    article_id: merchantArticle.articleId,
    merchant_id: merchantArticle.merchantId,
    regal_id: merchantArticle.warehouseId,
    quantity: merchantArticle.quantity,
  }
}

const { actions } = merchantArticleSlice

export const addMerchantArticle = (id: number, newMerchantArticle: MerchantArticle): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const response: Object = await request(`merchants/${id}/articles`, {
      schema: schemas.MERCHANT_ARTICLE,
      method: 'POST',
      payload: getPayload(newMerchantArticle),
    })
    dispatch(actions.addMerchantArticle(response as NormalizerMerchantArticleRequest))
  } catch (error) {
    dispatch(actions.hasError())
  }
}

export const fetchMerchantArticles = (id: number): AppThunk => async (dispatch:AppDispatch) => {
  dispatch(actions.startLoading())
  try {
    const response: Object = await request(`merchants/${id}/articles`, {schema: schemas.MERCHANT_ARTICLES})
    dispatch(actions.merchantArticlesSuccess(response as NormalizerMerchantArticlesRequest))
  } catch (error) {
    dispatch(actions.hasError())
  }
}

export const clearMerchantArticles = () => (dispatch: AppDispatch) => {
  dispatch(actions.clearMerchantArticles())
}
