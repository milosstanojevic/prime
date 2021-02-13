import { request } from "../../../api";
import { AppDispatch, AppThunk } from "../../../app";
import { Regal } from "../types";
import { schemas } from "../schemas";
import {warehouseRegalSlice} from "../slices";

export interface NormalizerRegalsRequest {
  result: number[];
  entities: {
    regals: { [id: number]: Regal },
  };
}

export interface NormalizerRegalRequest {
  result: number;
  entities: {
    regals: { [id: number]: Regal },
  };
}

const { actions } = warehouseRegalSlice

export const addWarehouseRegal = (id: number, newWarehouseRegal: Regal): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const response: Object = await request(`warehouses/${id}/regals`, {
      schema: schemas.REGAL,
      method: 'POST',
      payload: newWarehouseRegal,
    })
    dispatch(actions.addWarehouseRegal(response as NormalizerRegalRequest))
  } catch (error) {
    dispatch(actions.hasError())
  }
}

export const fetchWarehouseRegals = (id: number): AppThunk => async (dispatch:AppDispatch) => {
  dispatch(actions.startLoading())
  try {
    const response: Object = await request(`warehouses/${id}/regals`, {schema: schemas.REGAL})
    dispatch(actions.warehouseRegalSuccess(response as NormalizerRegalsRequest))
  } catch (error) {
    dispatch(actions.hasError())
  }
}
