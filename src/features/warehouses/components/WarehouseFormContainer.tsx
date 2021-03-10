import React, { FC, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../app";
import { addWarehouse } from "../actions";
import { WarehouseForm } from "../form";

interface IWarehouseFormContainer {
  id?: number,
  onSubmit?: () => void,
  onCancel?: () => void,
}

export const WarehouseFormContainer: FC<IWarehouseFormContainer> = ({
  id,
  onSubmit,
  onCancel,
}) => {
  const dispatch = useDispatch()

  const handleSubmit = useCallback((warehouse) => {
    dispatch(addWarehouse(warehouse))
    typeof onSubmit === 'function' && onSubmit()
  }, [dispatch, onSubmit])

  const warehouse = useSelector(
    (state: RootState) => {
      const item = state.warehouses.items.find(warehouse => warehouse.id === id)
      if (item) {
        return item;
      }
      return {
        id: 0,
        name: '',
        description: '',
        address: '',
      }
    })

  return (
    <WarehouseForm
      {...warehouse}
      onCancel={onCancel}
      onSubmit={handleSubmit}
    />
  )
}
