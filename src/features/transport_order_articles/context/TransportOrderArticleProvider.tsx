import { useAddMerchantArticle } from "features/merchant_articles";
import { TransportOrder } from "features/transport_orders/types";
import React from "react";
import { useDeleteTransportOrderArticle } from "../api";
import { TransportOrderArticle } from "../types";

type TransportOrderArticleContextType = {
  orderArticle: TransportOrderArticle;
  isRemoveArticleDisabled: boolean;
  deleteTransportOrderArticle: () => void;
  addToStock: () => void;
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
  transportOrder,
}: ITransportOrderArticleProvider) => {
  const mutateAddMerchantArticle = useAddMerchantArticle(
    transportOrder?.parentId || 0
  );

  const mutateDelete = useDeleteTransportOrderArticle(
    orderArticle.transportOrderId || 0,
    (oldData, id) => {
      return oldData?.filter((item) => item.id !== id);
    }
  );
  const deleteTransportOrderArticle = React.useCallback(() => {
    if (orderArticle?.id) {
      mutateDelete.mutate(orderArticle.id);
    }
  }, [orderArticle, mutateDelete]);

  const addToStock = React.useCallback(() => {
    const quantity = orderArticle.transportQuantity || 0;

    if (transportOrder?.parent === "merchant" && quantity > 0) {
      const attributes = {
        quantity,
        article_id: orderArticle.articleId,
      };
      mutateAddMerchantArticle.mutate(attributes);
    }
  }, [transportOrder, mutateAddMerchantArticle]);

  return (
    <TransportOrderArticleContext.Provider
      value={{
        orderArticle,
        isRemoveArticleDisabled,
        deleteTransportOrderArticle,
        addToStock,
      }}
    >
      {children}
    </TransportOrderArticleContext.Provider>
  );
};
