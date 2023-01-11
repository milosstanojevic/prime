import { useFetch, usePost } from '../../../utils';
import { Regal } from '../types';

const mainUrl = 'regals/';

export const useGetWarehouseRegals = (warehouseId: number) =>
    useFetch<Regal[]>(mainUrl, { warehouse: warehouseId });

export const useAddWarehouseRegal = (
    warehouseId: number,
    updater: (oldData: Regal[], newData: Regal) => Regal[]
) => usePost<Regal[], Regal>(mainUrl, { warehouse: warehouseId }, updater);
