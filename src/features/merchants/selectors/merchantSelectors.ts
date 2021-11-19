import { RootState } from "../../../app";
import { createSelector } from "@reduxjs/toolkit";

export const getAllMerchants = (state: RootState) => state.merchants.items;
export const getMerchantIds = (state: RootState) => state.merchants.itemIds;

export const makeGetMerchantById = (id: number) => {
  return createSelector(getAllMerchants, (merchants) => {
    const merchant = merchants.find((merchant) => merchant.id === id);
    if (merchant) {
      return { ...merchant };
    }
    return {};
  });
};
