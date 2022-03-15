import { useFetch, usePost } from "../../../utils";
import { pathToUrl } from "../../../utils/router";
import { WarehouseArticle } from "../types";

const mainUrl = "warehouses/:warehouseId/articles";

export const useGetWarehouseArticles = (warehouseId: number) =>
  useFetch<WarehouseArticle[]>(pathToUrl(mainUrl, { warehouseId }));

type Params = {
  articleId: number;
  warehouseId: number;
  regalId: number;
  regalPositionId: number;
};
export const useGetWarehouseArticleByParams = (params: Params) =>
  useFetch<WarehouseArticle>(
    `warehouse-article?article_id=${params.articleId}&warehouse_id=${params.warehouseId}&regal_id=${params.regalId}&regal_position_id=${params.regalPositionId}`
  );

export const useAddWarehouseArticle = (
  warehouseId: number,
  updater: (
    oldData: WarehouseArticle[],
    newData: WarehouseArticle
  ) => WarehouseArticle[]
) =>
  usePost<WarehouseArticle[], WarehouseArticle>(
    pathToUrl(mainUrl, { warehouseId }),
    undefined,
    updater
  );

export const useGetWarehouseRegalArticles = (
  warehouseId: number,
  regalId: number
) =>
  useFetch<WarehouseArticle[]>(
    pathToUrl("warehouses/:warehouseId/regals/:regalId/articles", {
      warehouseId,
      regalId,
    })
  );
