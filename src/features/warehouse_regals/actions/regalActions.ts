import { request } from "../../../api";
import { AppDispatch, AppThunk } from "../../../app";
import { Regal } from "../types";
import { schemas } from "../schemas";
import { warehouseRegalSlice } from "../slices";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface NormalizerRegalsRequest {
  result: number[];
  entities: {
    regals: { [id: number]: Regal };
  };
}

export interface NormalizerRegalRequest {
  result: number;
  entities: {
    regals: { [id: number]: Regal };
  };
}

const { actions } = warehouseRegalSlice;

export const addWarehouseRegal = (
  id: number,
  newWarehouseRegal: Regal
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const response: Object = await request(`warehouses/${id}/regals`, {
      schema: schemas.REGAL,
      method: "POST",
      payload: newWarehouseRegal,
    });
    dispatch(actions.addWarehouseRegal(response as NormalizerRegalRequest));
  } catch (error) {
    dispatch(actions.hasError());
  }
};

export const clearWarehouseRegals = () => (dispatch: AppDispatch) => {
  dispatch(actions.clearWarehouseRegals());
};

export const fetchWarehouseRegals = createAsyncThunk(
  "warehouseRegals/fetchWarehouseRegals",
  async (id: number, { dispatch }) => {
    const response: Object = await request(`warehouses/${id}/regals`, {
      schema: schemas.REGALS,
    });
    dispatch(
      actions.warehouseRegalSuccess(response as NormalizerRegalsRequest)
    );

    return response;
  }
);
