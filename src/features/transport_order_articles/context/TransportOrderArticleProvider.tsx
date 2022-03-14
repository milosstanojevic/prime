import React from "react";
import { useDeleteTransportOrderArticle } from "../api";
import { TransportOrderArticle } from "../types";

type TransportOrderArticleContextType = {
  orderArticle: TransportOrderArticle;
  isRemoveArticleDisabled: boolean;
  deleteTransportOrderArticle: () => void;
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
}

export const TransportOrderArticleProvider = ({
  orderArticle,
  children,
  isRemoveArticleDisabled = false,
}: ITransportOrderArticleProvider) => {
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
  return (
    <TransportOrderArticleContext.Provider
      value={{
        orderArticle,
        isRemoveArticleDisabled,
        deleteTransportOrderArticle,
      }}
    >
      {children}
    </TransportOrderArticleContext.Provider>
  );
};
