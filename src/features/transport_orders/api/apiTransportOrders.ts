import { useFetch, usePost, usePut, useDelete } from "../../../utils";
import { pathToUrl } from "../../../utils/router";
import { TransportOrder } from "../types";

const mainEntityUrl = "transport-orders";
const singleEntityUrl = `${mainEntityUrl}/:id`;

export const useGetTransportOrders = () =>
  useFetch<TransportOrder[]>(pathToUrl(mainEntityUrl));

export const useGetParentTransportOrders = (parent: string, parentId: number) =>
  useFetch<TransportOrder[]>(
    pathToUrl(`${mainEntityUrl}/${parent}/${parentId}`)
  );

export const useAddTransportOrder = (
  updater?: (
    oldData: TransportOrder[],
    newData: TransportOrder
  ) => TransportOrder[]
) =>
  usePost<TransportOrder[], TransportOrder>(
    pathToUrl(mainEntityUrl),
    undefined,
    updater
  );

export const useGetTransportOrder = (id: number) =>
  useFetch<TransportOrder>(pathToUrl(singleEntityUrl, { id }));

export const useEditTransportOrder = (
  updater?: (
    oldData: TransportOrder[],
    newData: TransportOrder
  ) => TransportOrder[],
  params?: object
) =>
  usePut<TransportOrder[], TransportOrder>(
    pathToUrl(mainEntityUrl),
    params,
    updater
  );

export const useDeleteTransportOrder = (
  updater: (
    oldData: TransportOrder[],
    deletedId: string | number
  ) => TransportOrder[]
) => useDelete<TransportOrder[]>(mainEntityUrl, undefined, updater);
