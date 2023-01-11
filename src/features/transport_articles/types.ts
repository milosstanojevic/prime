import { Article } from 'features/articles/types';
import { Warehouse } from 'features/warehouses/types';
import { Regal } from 'features/warehouse_regals/types';
import { RegalPosition } from 'features/warehouse_regal_positions/types';

export interface TransportArticle {
    id?: number;
    article?: number;
    warehouse?: Warehouse;
    regal?: Regal;
    regal_position?: RegalPosition;
    quantity?: number;
    created?: string;
    updated?: string;
    createdBy?: string;
    updatedBy?: string;
}
// Can be Warehouse, Regal or Regal Position Option
export interface TransportArticleOption {
    id: number;
    name: string;
}
