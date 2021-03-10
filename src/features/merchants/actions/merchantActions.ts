import { AppDispatch, AppThunk } from "../../../app";
import { Merchant } from "../types";
import { request } from "../../../api";
import { schemas } from "../schemas"
import { merchantSlice } from "../slices";

export interface NormalizerMerchantsRequest {
  result: number[];
  entities: {
    merchants: { [id: number]: Merchant },
  };
}

export interface NormalizerMerchantRequest {
  result: number;
  entities: {
    merchants: { [id: number]: Merchant },
  };
}

const { actions } = merchantSlice

export const addMerchant = (newMerchant: Merchant): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const response: Object = await request('merchants', {
      schema: schemas.MERCHANT,
      method: 'POST',
      payload: newMerchant,
    })
    dispatch(actions.merchantSuccess(response as NormalizerMerchantRequest))
  } catch (error) {
    dispatch(actions.hasError())
  }
}

export const fetchMerchants = (): AppThunk => async (dispatch:AppDispatch) => {
  dispatch(actions.startLoading())
  try {
    const response: Object = await request('merchants', {schema: schemas.MERCHANTS})
    dispatch(actions.merchantsSuccess(response as NormalizerMerchantsRequest))
  } catch (error) {
    dispatch(actions.hasError())
  }
}

export const fetchMerchant = (id: number): AppThunk => async (dispatch:AppDispatch) => {
  dispatch(actions.startLoading())
  try {
    const response: Object = await request(`merchants/${id}`, {schema: schemas.MERCHANT})
    dispatch(actions.merchantSuccess(response as NormalizerMerchantRequest))
  } catch (error) {
    dispatch(actions.hasError())
  }
}
