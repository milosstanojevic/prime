import { useFetch, usePost, usePut, useDelete } from "../../../utils";
import { pathToUrl } from "../../../utils/router";
import { Merchant } from "../types";

const mainEntityUrl = "merchants";
const singleEntityUrl = `${mainEntityUrl}/:id`;

export const useGetMerchants = () =>
  useFetch<Merchant[]>(pathToUrl(mainEntityUrl));

export const useAddMerchant = (
  updater: (oldData: Merchant[], newData: Merchant) => Merchant[]
) =>
  usePost<Merchant[], Merchant>(pathToUrl(mainEntityUrl), undefined, updater);

export const useGetMerchant = (id: number) =>
  useFetch<Merchant>(pathToUrl(singleEntityUrl, { id }));

export const useEditMerchant = (
  updater: (oldData: Merchant[], newData: Merchant) => Merchant[]
) => usePut<Merchant[], Merchant>(pathToUrl(mainEntityUrl), undefined, updater);

export const useDeleteMerchant = (
  updater: (oldData: Merchant[], deletedId: string | number) => Merchant[]
) => useDelete<Merchant[]>(mainEntityUrl, undefined, updater);
