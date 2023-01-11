import { useFetch, usePost, useDelete, usePut } from '../../../utils';
import { TransportOrderArticle } from '../types';

const mainUrl = 'transport-order-articles/';

export const useGetTransportOrderArticles = (transportOrderId: number) =>
    useFetch<TransportOrderArticle[]>(mainUrl, { transport_order: transportOrderId });

export const useAddTransportOrderArticle = (
    transportOrderId: number,
    updater?: (
        oldData: TransportOrderArticle[],
        newData: TransportOrderArticle
    ) => TransportOrderArticle[]
) =>
    usePost<TransportOrderArticle[], TransportOrderArticle>(
        mainUrl,
        { transport_order: transportOrderId },
        updater
    );

export const useEditTransportOrderArticle = (
    transportOrderId: number,
    updater?: (
        oldData: TransportOrderArticle[],
        newData: TransportOrderArticle
    ) => TransportOrderArticle[]
) =>
    usePut<TransportOrderArticle[], TransportOrderArticle>(
        mainUrl,
        { transport_order: transportOrderId },
        updater
    );

export const useAddToStockTransportOrderArticle = (
    transportOrderId: number,
    updater?: (
        oldData: TransportOrderArticle[],
        newData: TransportOrderArticle
    ) => TransportOrderArticle[]
) =>
    usePut<TransportOrderArticle[], TransportOrderArticle>(
        `${mainUrl}stock/`,
        { transport_order: transportOrderId },
        updater
    );

export const useDeleteTransportOrderArticle = (
    transportOrderId: number,
    updater?: (
        oldData: TransportOrderArticle[],
        deletedId: string | number
    ) => TransportOrderArticle[]
) => useDelete<TransportOrderArticle[]>(mainUrl, { transport_order: transportOrderId }, updater);
