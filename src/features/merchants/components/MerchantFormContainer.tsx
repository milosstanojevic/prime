import React, { FC, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../app";
import { addMerchant } from "../actions";
import { MerchantForm } from "../form";

interface IMerchantFormContainer {
  id?: number,
  onSubmit?: () => void,
  onCancel?: () => void,
}

export const MerchantFormContainer: FC<IMerchantFormContainer> = ({
  id,
  onSubmit,
  onCancel,
}) => {
  const dispatch = useDispatch()

  const handleSubmit = useCallback((merchant) => {
    dispatch(addMerchant(merchant))
    typeof onSubmit === 'function' && onSubmit()
  }, [dispatch, onSubmit])

  const merchant = useSelector(
    (state: RootState) => {
      const item = state.merchants.items.find(merchant => merchant.id === id)
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
    <MerchantForm
      {...merchant}
      onCancel={onCancel}
      onSubmit={handleSubmit}
    />
  )
}
