import { useFetch, usePost } from '../../../utils';
import { RegalPosition } from '../types';

export const useGetRegalPositions = (regalId: number) =>
    useFetch<RegalPosition[]>('regal-positions/', { regal: regalId });

export const useAddRegalPosition = (
    regalId: number,
    updater: (oldData: RegalPosition[], newData: RegalPosition) => RegalPosition[]
) => usePost<RegalPosition[], RegalPosition>('regal-positions/', { regal: regalId }, updater);
