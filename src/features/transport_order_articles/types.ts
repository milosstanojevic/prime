import { Article } from '../articles/types';

export interface TransportOrderArticle extends Article {
    id?: number;
    transport_order?: number;
    article?: number;
    requested_quantity?: number;
    transport_quantity?: number;
    reason?: string;
    status?: string;
    created?: string;
    updated?: string;
    createdBy?: string;
    updatedBy?: string;
}
