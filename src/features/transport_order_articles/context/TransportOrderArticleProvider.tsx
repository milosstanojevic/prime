import { useAddMerchantArticle } from 'features/merchant_articles';
import { TransportOrder } from 'features/transport_orders/types';
import React from 'react';
import { useDeleteTransportOrderArticle, useEditTransportOrderArticle } from '../api';
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
    const mutateAddMerchantArticle = useAddMerchantArticle(transportOrder?.parentId || 0);

    const mutateDelete = useDeleteTransportOrderArticle(
        orderArticle.transportOrderId || 0,
        (oldData, id) => {
            return oldData?.filter((item) => item.id !== id);
        }
    );

    const mutateEdit = useEditTransportOrderArticle(
        orderArticle.transportOrderId || 0,
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
        const quantity = orderArticle.transportQuantity || 0;

        if (transportOrder?.parent === 'merchant' && quantity > 0) {
            const attributes = {
                quantity,
                article_id: orderArticle.articleId
            };
            mutateAddMerchantArticle.mutate(attributes);
        }
    }, [transportOrder, mutateAddMerchantArticle, orderArticle]);

    const addToStock = React.useCallback(() => {
        mutateEdit.mutateAsync({ status: 2, id: orderArticle.id }).then(() => addMerchantArticle());
    }, [mutateEdit, addMerchantArticle, orderArticle]);

    const isAddToStockEnabled = React.useMemo(() => {
        const orderStatus = transportOrder?.status || 0;
        return orderArticle.status === 1 && orderStatus > 3;
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
