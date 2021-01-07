import {AppDispatch, AppThunk} from "../../../app";
import {Warehouse} from "../types";
import warehouseSlice from "../slices/warehouseSlice";

export const addWarehouse = (
  newWarehouse: Warehouse
): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(warehouseSlice.actions.addWarehouse(newWarehouse))
}
