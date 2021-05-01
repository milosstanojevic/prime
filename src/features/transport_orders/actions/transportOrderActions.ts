import { AppDispatch, AppThunk } from "../../../app";
import { TransportOrder } from "../types";
import { request } from "../../../api";
import { schemas } from "../schemas"
import { transportOrderSlice } from "../slices";

const apiUrl = 'transport-orders'

export interface NormalizerTransportOrdersRequest {
  result: number[];
  entities: {
    transport_orders: { [id: number]: TransportOrder },
  };
}

export interface NormalizerTransportOrderRequest {
  result: number;
  entities: {
    transport_orders: { [id: number]: TransportOrder },
  };
}

const getPayload = (transportOrder: TransportOrder) => {
  return {
    parent: transportOrder.parent,
    parent_id: transportOrder.parentId,
    transport_id: transportOrder.transportId,
  }
}

const { actions } = transportOrderSlice

export const addTransportOrder = (attributes: TransportOrder): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const response: Object = await request(apiUrl, {
      schema: schemas.TRANSPORT_ORDER,
      method: 'POST',
      payload: getPayload(attributes),
    })
    dispatch(actions.transportOrderSuccess(response as NormalizerTransportOrderRequest))
  } catch (error) {
    dispatch(actions.hasError())
  }
}

export const fetchTransportOrders = (): AppThunk => async (dispatch:AppDispatch) => {
  dispatch(actions.startLoading())
  try {
    const response: Object = await request(apiUrl, {schema: schemas.TRANSPORT_ORDERS})
    dispatch(actions.transportOrdersSuccess(response as NormalizerTransportOrdersRequest))
  } catch (error) {
    dispatch(actions.hasError())
  }
}

export const fetchTransportOrder = (id: number): AppThunk => async (dispatch:AppDispatch) => {
  dispatch(actions.startLoading())
  try {
    const response: Object = await request(`${apiUrl}/${id}`, {schema: schemas.TRANSPORT_ORDER})
    dispatch(actions.transportOrderSuccess(response as NormalizerTransportOrderRequest))
  } catch (error) {
    dispatch(actions.hasError())
  }
}

export const clearTransportOrders = () => (dispatch: AppDispatch) => {
  dispatch(actions.clearTransportOrders())
}
