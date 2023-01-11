import { Warehouse } from 'features/warehouses/types';
import { Regal } from 'features/warehouse_regals/types';
import { RegalPosition } from 'features/warehouse_regal_positions/types';
import { useMemo } from 'react';
import { useFetch, usePost, usePut, useDelete } from '../../../utils';
import { TransportArticle, TransportArticleOption } from '../types';

// /transport-order-articles/{id}/articles GET, POST
// /transport-order-articles/{id}/articles/{articleId} PUT, DELETE
const mainUrl = 'transport-articles/';

export type getTransportArticlesResponse = {
    transportArticles: TransportArticle[];
    warehouses: Warehouse[];
    regals: Regal[];
    regalPositions: RegalPosition[];
};

export const useGetTransportArticles = (transportOrderArticleId: number) =>
    useFetch<TransportArticle[]>(mainUrl, { transport_order_article: transportOrderArticleId });

type Params = {
    articleId: number;
    warehouseId?: number;
    regalId?: number;
};
export const useGetTransportArticleOptions = (params: Params) => {
    const queryParams = useMemo(() => {
        const { articleId, warehouseId, regalId } = params;

        if (articleId && !warehouseId && !regalId) {
            return `type=warehouse&article_id=${articleId}`;
        }
        if (articleId && warehouseId && !regalId) {
            return `type=regal&article_id=${articleId}&warehouse_id=${warehouseId}`;
        }
        return `type=regal_position&article_id=${articleId}&warehouse_id=${warehouseId}&regal_id=${regalId}`;
    }, [params]);

    return useFetch<TransportArticleOption[]>(`transport-articles/options/?${queryParams}`);
};

export const useAddTransportArticle = (
    transportOrderArticleId: number,
    updater?: (oldData: TransportArticle[], newData: TransportArticle) => TransportArticle[]
) =>
    usePost<TransportArticle[], TransportArticle>(
        mainUrl,
        { transport_order_article: transportOrderArticleId },
        updater
    );

export const useEditTransportArticle = (
    transportOrderArticleId: number,
    updater?: (oldData: TransportArticle[], newData: TransportArticle) => TransportArticle[]
) =>
    usePut<TransportArticle[], TransportArticle>(
        mainUrl,
        { transport_order_article: transportOrderArticleId },
        updater
    );

export const useDeleteTransportArticle = (
    transportOrderArticleId: number,
    updater?: (oldData: TransportArticle[], deletedId: string | number) => TransportArticle[]
) =>
    useDelete<TransportArticle[]>(
        mainUrl,
        { transport_order_article: transportOrderArticleId },
        updater
    );
