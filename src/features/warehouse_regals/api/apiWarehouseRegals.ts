import { useFetch, usePost } from '../../../utils';
import { pathToUrl } from '../../../utils/router';
import { Regal } from '../types';

const mainUrl = 'warehouses/:warehouseId/regals';

export const useGetWarehouseRegals = (warehouseId: number) =>
    useFetch<Regal[]>(pathToUrl(mainUrl, { warehouseId }));

export const useAddWarehouseRegal = (
    warehouseId: number,
    updater: (oldData: Regal[], newData: Regal) => Regal[]
) => usePost<Regal[], Regal>(pathToUrl(mainUrl, { warehouseId }), undefined, updater);
