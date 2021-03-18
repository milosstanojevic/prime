import { Article } from "../articles/types";

export interface MerchantArticle extends Article {
  id?: number,
  merchantId?: number,
  warehouseId?: number,
  articleId?: number,
  quantity?: number,
  createdAt?: number;
  updatedAt?: number;
  createdBy?: string;
  updatedBy?: string;
}
