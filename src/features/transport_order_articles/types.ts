import { Article } from "features/articles/types";

export interface TransportOrderArticle extends Article {
  id?: number;
  transportOrderId?: number;
  articleId?: number;
  quantity?: number;
  createdAt?: number;
  updatedAt?: number;
  createdBy?: string;
  updatedBy?: string;
}
