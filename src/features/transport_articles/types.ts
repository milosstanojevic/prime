export interface TransportArticle {
    id?: number;
    articleId?: number;
    warehouseId?: number;
    regalId?: number;
    regalPositionId?: number;
    quantity?: number;
    createdAt?: number;
    updatedAt?: number;
    createdBy?: string;
    updatedBy?: string;
}
// Can be Warehouse, Regal or Regal Position Option
export interface TransportArticleOption {
    id: number;
    name: string;
}
