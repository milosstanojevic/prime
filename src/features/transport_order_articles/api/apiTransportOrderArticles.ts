import { useFetch, usePost, useDelete } from "../../../utils";
import { pathToUrl } from "../../../utils/router";
import { TransportOrderArticle } from "../types";

const mainUrl = "transport-orders/:transportOrderId/articles";

export const useGetTransportOrderArticles = (transportOrderId: number) =>
  useFetch<TransportOrderArticle[]>(pathToUrl(mainUrl, { transportOrderId }));

export const useAddTransportOrderArticle = (
  transportOrderId: number,
  updater: (
    oldData: TransportOrderArticle[],
    newData: TransportOrderArticle
  ) => TransportOrderArticle[]
) =>
  usePost<TransportOrderArticle[], TransportOrderArticle>(
    pathToUrl(mainUrl, { transportOrderId }),
    undefined,
    updater
  );

export const useDeleteTransportOrderArticle = (
  transportOrderId: number,
  updater: (
    oldData: TransportOrderArticle[],
    deletedId: string | number
  ) => TransportOrderArticle[]
) =>
  useDelete<TransportOrderArticle[]>(
    pathToUrl(mainUrl, { transportOrderId }),
    undefined,
    updater
  );
