import { AppDispatch, AppThunk } from "../../../app";
import { Warehouse } from "../types";
import { warehouseSlice } from "../slices";
import { request } from "../../../api";
import { schemas } from "../schemas";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface NormalizerWarehousesRequest {
  result: number[];
  entities: {
    warehouses: { [id: number]: Warehouse };
  };
}

export interface NormalizerWarehouseRequest {
  result: number;
  entities: {
    warehouses: { [id: number]: Warehouse };
  };
}

const { actions } = warehouseSlice;

export const addWarehouse = (attributes: Warehouse): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    const response: Object = await request("warehouses", {
      schema: schemas.WAREHOUSE,
      method: "POST",
      payload: attributes,
    });
    dispatch(actions.warehouseSuccess(response as NormalizerWarehouseRequest));
  } catch (error) {
    dispatch(actions.hasError());
  }
};

export const editWarehouse = (
  id: number,
  attributes: Warehouse
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const response: Object = await request(`warehouses/${id}`, {
      schema: schemas.WAREHOUSE,
      method: "PUT",
      payload: attributes,
    });
    dispatch(actions.warehouseSuccess(response as NormalizerWarehouseRequest));
  } catch (error) {
    dispatch(actions.hasError());
  }
};

export const fetchWarehouses = createAsyncThunk(
  "warehouses/fetchAllWarehouses",
  async (_, { dispatch }) => {
    const response: Object = await request("warehouses", {
      schema: schemas.WAREHOUSES,
    });
    dispatch(
      actions.warehousesSuccess(response as NormalizerWarehousesRequest)
    );
    return response;
  }
);

export const fetchWarehouse = createAsyncThunk(
  "warehouses/fetchWarehouse",
  async (id: number, { dispatch }) => {
    const response: Object = await request(`warehouses/${id}`, {
      schema: schemas.WAREHOUSE,
    });
    dispatch(actions.warehouseSuccess(response as NormalizerWarehouseRequest));

    return response;
  }
);

export const clearWarehouses = () => (dispatch: AppDispatch) => {
  dispatch(actions.clearAllWarehouses());
};
