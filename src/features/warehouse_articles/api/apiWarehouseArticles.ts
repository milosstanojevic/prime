import { useFetch, usePost } from '../../../utils';
import { pathToUrl } from '../../../utils/router';
import { WarehouseArticle } from '../types';

const mainUrl = 'warehouse-articles/';

export const useGetWarehouseArticles = (warehouseId?: number) =>
    useFetch<WarehouseArticle[]>(mainUrl, warehouseId ? { warehouse: warehouseId } : undefined);

type Params = {
    articleId: number;
    warehouseId: number;
    regalId: number;
    regalPositionId: number;
};
export const useGetWarehouseArticleByParams = (params: Params) =>
    useFetch<WarehouseArticle>(
        `warehouse-articles/query/?article=${params.articleId}&warehouse=${params.warehouseId}&regal=${params.regalId}&regal_position=${params.regalPositionId}`,
        undefined,
        { staleTime: 0, cacheTime: 0 }
    );

export const useAddWarehouseArticle = (
    warehouseId: number,
    updater: (oldData: WarehouseArticle[], newData: WarehouseArticle) => WarehouseArticle[]
) => usePost<WarehouseArticle[], WarehouseArticle>(mainUrl, { warehouse: warehouseId }, updater);

export const useGetWarehouseRegalArticles = (warehouseId: number, regalId: number) =>
    useFetch<WarehouseArticle[]>(
        pathToUrl('warehouses/:warehouseId/regals/:regalId/articles', {
            warehouseId,
            regalId
        })
    );
