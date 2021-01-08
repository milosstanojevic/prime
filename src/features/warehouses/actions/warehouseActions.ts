import {AppDispatch, AppThunk} from "../../../app";
import {Warehouse} from "../types";
import { warehouseSlice } from "../slices";
import {request} from "../../../api";
import { schemas } from "../schemas"

export interface NormalizerWarehousesRequest {
  result: number[];
  entities: {
    warehouses: { [id: number]: Warehouse },
  };
}

export interface NormalizerWarehouseRequest {
  result: number;
  entities: {
    warehouses: { [id: number]: Warehouse },
  };
}

const { actions } = warehouseSlice

export const addWarehouse = (newWarehouse: Warehouse): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const response: Object = await request('warehouses', {
      schema: schemas.WAREHOUSE,
      method: 'POST',
      payload: newWarehouse,
    })
    dispatch(actions.addWarehouse(response as NormalizerWarehouseRequest))
  } catch (error) {
    dispatch(actions.hasError())
  }
}

export const fetchWarehouses = (): AppThunk => async (dispatch:AppDispatch) => {
  dispatch(actions.startLoading())
  try {
    const response: Object = await request('warehouses', {schema: schemas.WAREHOUSES})
    dispatch(actions.warehousesSuccess(response as NormalizerWarehousesRequest))
  } catch (error) {
    dispatch(actions.hasError())
  }
}
