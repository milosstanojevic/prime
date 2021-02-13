import { request } from "../../../api";
import { AppDispatch, AppThunk } from "../../../app";
import { Transport } from "../types";
import { schemas } from "../schemas";
import { transportSlice } from "../slices";

export interface NormalizerTransportsRequest {
  result: number[];
  entities: {
    transports: { [id: number]: Transport },
  };
}

export interface NormalizerTransportRequest {
  result: number;
  entities: {
    transports: { [id: number]: Transport },
  };
}

const { actions } = transportSlice

export const addTransport = (newTransport: Transport): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const response: Object = await request(`transports`, {
      schema: schemas.TRANSPORT,
      method: 'POST',
      payload: newTransport,
    })
    dispatch(actions.addTransport(response as NormalizerTransportRequest))
  } catch (error) {
    dispatch(actions.hasError())
  }
}

export const fetchTransports = (): AppThunk => async (dispatch:AppDispatch) => {
  dispatch(actions.startLoading())
  try {
    const response: Object = await request(`transports`, {schema: schemas.TRANSPORTS})
    dispatch(actions.transportSuccess(response as NormalizerTransportsRequest))
  } catch (error) {
    dispatch(actions.hasError())
  }
}
