import { useFetch, usePost } from '../../../utils';
import { MerchantArticle } from '../types';

const mainUrl = 'merchant-articles/';

export const useGetMerchantArticles = (merchantId: number) =>
    useFetch<MerchantArticle[]>(mainUrl, { merchant: merchantId });

export const useAddMerchantArticle = (
    merchantId: number,
    updater?: (oldData: MerchantArticle[], newData: MerchantArticle) => MerchantArticle[]
) => usePost<MerchantArticle[], MerchantArticle>(mainUrl, { merchant: merchantId }, updater);
