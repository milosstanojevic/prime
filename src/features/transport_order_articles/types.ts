import { Article } from "features/articles/types";

export interface TransportOrderArticle extends Article {
  id?: number;
  transportOrderId?: number;
  articleId?: number;
  requestedQuantity?: number;
  transportQuantity?: number;
  reason?: string;
  createdAt?: number;
  updatedAt?: number;
  createdBy?: string;
  updatedBy?: string;
}
