import { useFetch, usePost, usePut, useDelete } from '../../../utils';
import { pathToUrl } from '../../../utils/router';
import { Transport } from '../types';

const mainEntityUrl = 'transport-routes';
const singleEntityUrl = `${mainEntityUrl}/:id`;

export const useGetTransportRoutes = () => useFetch<Transport[]>(pathToUrl(mainEntityUrl));

export const useAddTransportRoute = (
    updater: (oldData: Transport[], newData: Transport) => Transport[]
) => usePost<Transport[], Transport>(pathToUrl(mainEntityUrl), undefined, updater);

export const useGetTransportRoute = (id: number) =>
    useFetch<Transport>(pathToUrl(singleEntityUrl, { id }));

export const useEditTransportRoute = (
    updater: (oldData: Transport[], newData: Transport) => Transport[]
) => usePut<Transport[], Transport>(pathToUrl(mainEntityUrl), undefined, updater);

export const useDeleteTransportRoute = (
    updater: (oldData: Transport[], deletedId: string | number) => Transport[]
) => useDelete<Transport[]>(mainEntityUrl, undefined, updater);
