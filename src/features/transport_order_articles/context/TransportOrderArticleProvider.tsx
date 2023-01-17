import { useAddMerchantArticle } from '../../../features/merchant_articles';
import { TransportOrder } from '../../../features/transport_orders/types';
import React from 'react';
import { useDeleteTransportOrderArticle, useAddToStockTransportOrderArticle } from '../api';
import { TransportOrderArticle } from '../types';

type TransportOrderArticleContextType = {
    orderArticle: TransportOrderArticle;
    isRemoveArticleDisabled: boolean;
    deleteTransportOrderArticle: () => void;
    addToStock: () => void;
    isAddToStockEnabled: boolean;
};

const TransportOrderArticleContext = React.createContext<
    TransportOrderArticleContextType | undefined
>(undefined);

export const useTransportOrderArticleContext = () => {
    const ctx = React.useContext(TransportOrderArticleContext);

    if (ctx === undefined) {
        throw new Error(
            `'useTransportOrderArticleContext' must be used within a 'TransportOrderArticleContextProvider'`
        );
    }

    return ctx;
};

interface ITransportOrderArticleProvider {
    orderArticle: TransportOrderArticle;
    children: React.ReactNode;
    isRemoveArticleDisabled?: boolean;
    transportOrder?: TransportOrder;
}

export const TransportOrderArticleProvider = ({
    orderArticle,
    children,
    isRemoveArticleDisabled = false,
    transportOrder
}: ITransportOrderArticleProvider) => {
    const mutateAddMerchantArticle = useAddMerchantArticle(transportOrder?.parent_id || 0);

    const mutateDelete = useDeleteTransportOrderArticle(
        orderArticle.transport_order || 0,
        (oldData, id) => {
            return oldData?.filter((item) => item.id !== id);
        }
    );

    const mutateAddToStock = useAddToStockTransportOrderArticle(
        orderArticle.transport_order || 0,
        (oldItems, newItem) => {
            return oldItems?.map((item) =>
                item.id === newItem.id ? { ...item, ...newItem } : item
            );
        }
    );

    const deleteTransportOrderArticle = React.useCallback(() => {
        if (orderArticle?.id) {
            mutateDelete.mutate(orderArticle.id);
        }
    }, [orderArticle, mutateDelete]);

    const addMerchantArticle = React.useCallback(() => {
        const quantity = orderArticle.transport_quantity || 0;

        if (transportOrder?.parent === 'merchant' && quantity > 0) {
            const attributes = {
                quantity,
                article: orderArticle.article,
                merchant: transportOrder.parent_id
            };
            mutateAddMerchantArticle.mutate(attributes);
        }
    }, [transportOrder, mutateAddMerchantArticle, orderArticle]);

    const addToStock = React.useCallback(() => {
        mutateAddToStock
            .mutateAsync({ status: '2', id: orderArticle.id })
            .then(() => addMerchantArticle());
    }, [mutateAddToStock, addMerchantArticle, orderArticle]);

    const isAddToStockEnabled = React.useMemo(() => {
        const orderStatus = transportOrder?.status || 0;
        return orderArticle.status === '1' && orderStatus === '5'; // order article = 1 pending, order status 5 = arrived
    }, [transportOrder, orderArticle]);

    return (
        <TransportOrderArticleContext.Provider
            value={{
                orderArticle,
                isRemoveArticleDisabled,
                deleteTransportOrderArticle,
                addToStock,
                isAddToStockEnabled
            }}
        >
            {children}
        </TransportOrderArticleContext.Provider>
    );
};
