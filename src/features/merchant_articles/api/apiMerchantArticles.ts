import { useFetch, usePost } from "../../../utils";
import { pathToUrl } from "../../../utils/router";
import { MerchantArticle } from "../types";

const mainUrl = "merchants/:merchantId/articles";

export const useGetMerchantArticles = (merchantId: number) =>
  useFetch<MerchantArticle[]>(pathToUrl(mainUrl, { merchantId }));

export const useAddMerchantArticle = (
  merchantId: number,
  updater?: (
    oldData: MerchantArticle[],
    newData: MerchantArticle
  ) => MerchantArticle[]
) =>
  usePost<MerchantArticle[], MerchantArticle>(
    pathToUrl(mainUrl, { merchantId }),
    undefined,
    updater
  );
