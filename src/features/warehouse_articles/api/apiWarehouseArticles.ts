import { useFetch, usePost } from "../../../utils";
import { pathToUrl } from "../../../utils/router";
import { WarehouseArticle } from "../types";

const mainUrl = "warehouses/:warehouseId/articles";

export const useGetWarehouseArticles = (warehouseId: number) =>
  useFetch<WarehouseArticle[]>(pathToUrl(mainUrl, { warehouseId }));

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
