import { RootState } from "../../../app";

export const getAllMerchantArticles = (state: RootState) =>
  state.merchant_articles.items;
export const getMerchantArticleIds = (state: RootState) =>
  state.merchant_articles.itemIds;
