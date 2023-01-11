import { Article } from '../articles/types';

export interface WarehouseArticle extends Article {
    id?: number;
    warehouse?: number;
    article?: number;
    regal?: number;
    regal_position?: number;
    quantity?: number;
    created?: string;
    updated?: string;
    createdBy?: string;
    updatedBy?: string;
}
