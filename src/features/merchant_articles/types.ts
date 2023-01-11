import { Article } from '../articles/types';

export interface MerchantArticle extends Article {
    id?: number;
    merchant?: number;
    warehouse?: number;
    article?: number;
    quantity?: number;
    created?: string;
    updated?: string;
    createdBy?: string;
    updatedBy?: string;
}
