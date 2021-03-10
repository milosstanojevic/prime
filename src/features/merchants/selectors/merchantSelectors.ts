import { RootState } from "../../../app";
import {createSelector} from "@reduxjs/toolkit";

export const getAllMerchants = (state: RootState) => state.merchants.items

export const makeGetMerchantById = () => {
  return createSelector(
    getAllMerchants,
    (state: RootState, id: number) => id,
    (merchants, id) => {
      const merchant = merchants.find((merchant) => merchant.id === id)
      if (merchant) {
        return { ...merchant }
      }
      return {}
    }
  )
}
