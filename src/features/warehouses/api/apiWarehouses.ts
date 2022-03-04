import { useFetch, usePost, usePut, useDelete } from "../../../utils";
import { pathToUrl } from "../../../utils/router";
import { Warehouse } from "../types";

const mainEntityUrl = "warehouses";
const singleEntityUrl = `${mainEntityUrl}/:id`;

export const useGetWarehouses = () =>
  useFetch<Warehouse[]>(pathToUrl(mainEntityUrl));

export const useAddWarehouse = (
  updater: (oldData: Warehouse[], newData: Warehouse) => Warehouse[]
) => usePost<Warehouse[], Warehouse>(pathToUrl(mainEntityUrl), undefined, updater);

export const useGetWarehouse = (id: number) =>
  useFetch<Warehouse>(pathToUrl(singleEntityUrl, { id }));

export const useEditWarehouse = (
  updater: (oldData: Warehouse[], newData: Warehouse) => Warehouse[]
) => usePut<Warehouse[], Warehouse>(pathToUrl(mainEntityUrl), undefined, updater);

export const useDeleteWarehouse = (
  updater: (oldData: Warehouse[], deletedId: string | number) => Warehouse[]
) => useDelete<Warehouse[]>(mainEntityUrl, undefined, updater);
