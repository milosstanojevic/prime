import {AppDispatch, AppThunk} from "../../../app/store";
import {Warehouse} from "../types";
import warehouseSlice from "../slices/warehouseSlice";

export const addWarehouse = (
  text: string
): AppThunk => async (dispatch: AppDispatch) => {
  const newWarehouse : Warehouse = {
    id: Math.random().toString(36).substr(2, 9), // https://gist.github.com/gordonbrander/2230317,
    name: text,
    description: 'Desc',
    address: 'address',
  }

  dispatch(warehouseSlice.actions.addWarehouse(newWarehouse))
}
