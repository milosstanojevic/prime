import { useMemo } from "react";
import { useFetch, usePost, usePut, useDelete } from "../../../utils";
import { pathToUrl } from "../../../utils/router";
import { TransportArticle, TransportArticleOption } from "../types";

// /transport-order-articles/{id}/articles GET, POST
// /transport-order-articles/{id}/articles/{articleId} PUT, DELETE
const mainUrl = "transport-order-articles/:transportOrderArticleId/articles";

export const useGetTransportArticles = (transportOrderArticleId: number) =>
  useFetch<TransportArticle[]>(pathToUrl(mainUrl, { transportOrderArticleId }));

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

  return useFetch<TransportArticleOption[]>(
    `transport-article-options?${queryParams}`
  );
};

export const useAddTransportArticle = (
  transportOrderArticleId: number,
  updater?: (
    oldData: TransportArticle[],
    newData: TransportArticle
  ) => TransportArticle[]
) =>
  usePost<TransportArticle[], TransportArticle>(
    pathToUrl(mainUrl, { transportOrderArticleId }),
    undefined,
    updater
  );

export const useEditTransportArticle = (
  transportOrderArticleId: number,
  updater?: (
    oldData: TransportArticle[],
    newData: TransportArticle
  ) => TransportArticle[]
) =>
  usePut<TransportArticle[], TransportArticle>(
    pathToUrl(mainUrl, { transportOrderArticleId }),
    undefined,
    updater
  );

export const useDeleteTransportArticle = (
  transportOrderArticleId: number,
  updater?: (
    oldData: TransportArticle[],
    deletedId: string | number
  ) => TransportArticle[]
) =>
  useDelete<TransportArticle[]>(
    pathToUrl(mainUrl, { transportOrderArticleId }),
    undefined,
    updater
  );
