import { Article } from '../articles/types';

export interface WarehouseArticle extends Article {
    id?: number;
    warehouseId?: number;
    articleId?: number;
    regalId?: number;
    regalPositionId?: number;
    quantity?: number;
    createdAt?: number;
    updatedAt?: number;
    createdBy?: string;
    updatedBy?: string;
}
