import { AppDispatch, AppThunk } from "../../../app";
import { Order } from "../types";
import { request } from "../../../api";
import { schemas } from "../schemas"
import { orderSlice } from "../slices";

export interface NormalizerOrdersRequest {
  result: number[];
  entities: {
    orders: { [id: number]: Order },
  };
}

export interface NormalizerOrderRequest {
  result: number;
  entities: {
    orders: { [id: number]: Order },
  };
}

const { actions } = orderSlice

export const addOrder = (newOrder: Order): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const response: Object = await request('orders', {
      schema: schemas.ORDER,
      method: 'POST',
      payload: newOrder,
    })
    dispatch(actions.orderSuccess(response as NormalizerOrderRequest))
  } catch (error) {
    dispatch(actions.hasError())
  }
}

export const fetchOrders = (): AppThunk => async (dispatch:AppDispatch) => {
  dispatch(actions.startLoading())
  try {
    const response: Object = await request('orders', {schema: schemas.ORDERS})
    dispatch(actions.ordersSuccess(response as NormalizerOrdersRequest))
  } catch (error) {
    dispatch(actions.hasError())
  }
}

export const fetchOrder = (id: number): AppThunk => async (dispatch:AppDispatch) => {
  dispatch(actions.startLoading())
  try {
    const response: Object = await request(`orders/${id}`, {schema: schemas.ORDER})
    dispatch(actions.orderSuccess(response as NormalizerOrderRequest))
  } catch (error) {
    dispatch(actions.hasError())
  }
}
