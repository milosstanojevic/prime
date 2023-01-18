import { useFetch, usePost, usePut, useDelete, PaginationType } from '../../../utils';
import { pathToUrl } from '../../../utils/router';
import { Article } from '../types';

const mainEntityUrl = 'articles/';
const singleEntityUrl = `${mainEntityUrl}:id/`;

export const useGetArticles = () => useFetch<Article[]>(pathToUrl(mainEntityUrl));

export const useGetPaginatedArticles = (params: {
    limit: number;
    offset: number;
    search?: string;
}) => useFetch<PaginationType<Article>>(pathToUrl(mainEntityUrl), params);

export const useAddArticle = (updater: (oldData: Article[], newData: Article) => Article[]) =>
    usePost<Article[], Article>(pathToUrl(mainEntityUrl), undefined, updater);

export const useGetArticle = (id: number) => useFetch<Article>(pathToUrl(singleEntityUrl, { id }));

export const useEditArticle = (updater: (oldData: Article[], newData: Article) => Article[]) =>
    usePut<Article[], Article>(pathToUrl(mainEntityUrl), undefined, updater);

export const useDeleteArticle = (
    updater: (oldData: Article[], deletedId: string | number) => Article[]
) => useDelete<Article[]>(mainEntityUrl, undefined, updater);
