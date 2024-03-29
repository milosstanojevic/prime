import { api } from './api';
import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
    UseQueryOptions,
    QueryFunctionContext
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import hasOwnProperty from './hasOwnProperty';

interface GetInfinitePagesInterface<T> {
    nextId?: number;
    previousId?: number;
    data: T;
    count: number;
}

type QueryKeyT = [string, object | undefined];
const meta = undefined;

export const fetcher = async <T>({
    queryKey,
    pageParam
}: QueryFunctionContext<QueryKeyT>): Promise<T> => {
    const [url, params] = queryKey;
    const res = await api.get<T>(url, { params: { ...params, pageParam } });
    return res.data;
};

export const useLoadMore = <T>(url: string | null, params?: object) => {
    const context = useInfiniteQuery<
        GetInfinitePagesInterface<T>,
        Error,
        GetInfinitePagesInterface<T>,
        QueryKeyT
    >([url!, params], ({ queryKey, pageParam = 1 }) => fetcher({ queryKey, pageParam, meta }), {
        getPreviousPageParam: (firstPage) => firstPage.previousId ?? false,
        getNextPageParam: (lastPage) => {
            return lastPage.nextId ?? false;
        }
    });

    return context;
};

export const usePrefetch = <T>(url: string | null, params?: object) => {
    const queryClient = useQueryClient();

    return () => {
        if (!url) {
            return;
        }

        queryClient.prefetchQuery<T, Error, T, QueryKeyT>([url!, params], ({ queryKey }) =>
            fetcher({ queryKey, meta })
        );
    };
};

export const useFetch = <T>(
    url: string | null,
    params?: object,
    config?: UseQueryOptions<T, Error, T, QueryKeyT>
) => {
    const context = useQuery<T, Error, T, QueryKeyT>(
        [url!, params],
        ({ queryKey }) => fetcher({ queryKey, meta }),
        {
            enabled: !!url,
            ...config
        }
    );

    return context;
};

const useGenericMutation = <T, S>(
    func: (data: S) => Promise<AxiosResponse<S>>,
    url: string,
    params?: object,
    updater?: ((oldData: T, newData: S) => T) | undefined
) => {
    const queryClient = useQueryClient();

    return useMutation<AxiosResponse, AxiosError, S>(func, {
        onMutate: async (data) => {
            await queryClient.cancelQueries([url!, params]);

            const previousData = queryClient.getQueryData([url!, params]);

            if (updater) {
                queryClient.setQueryData<T>([url, params], (oldData) => {
                    return updater(oldData!, data);
                });
            }

            return previousData;
        },
        onError: (err, _, context) => {
            console.error(err.message);
            queryClient.setQueryData([url!, params], context);
        },
        onSettled: () => {
            queryClient.invalidateQueries([url!, params]);
        }
    });
};

export const usePost = <T, S>(
    url: string,
    params?: object,
    updater?: (oldData: T, newData: S) => T
) => {
    return useGenericMutation<T, S>((data) => api.post<S>(url, data), url, params, updater);
};

export const usePatch = <T, S>(
    url: string,
    params?: object,
    updater?: (oldData: T, newData: S) => T
) => {
    return useGenericMutation<T, S>((data) => api.patch<S>(url, data), url, params, updater);
};

export const usePut = <T, S>(
    url: string,
    params?: object,
    updater?: (oldData: T, newData: S) => T
) => {
    return useGenericMutation<T, S>(
        (data) =>
            api.put<S>(
                data !== null &&
                    typeof data === 'object' &&
                    hasOwnProperty(data, 'id') &&
                    typeof data.id === 'number'
                    ? `${url}${data.id}/update/`
                    : url,
                data
            ),
        url,
        params,
        updater
    );
};

export const useDelete = <T>(
    url: string,
    params?: object,
    updater?: (oldData: T, id: string | number) => T
) => {
    return useGenericMutation<T, string | number>(
        (id) => api.delete(`${url}${id}/delete/`),
        url,
        params,
        updater
    );
};
