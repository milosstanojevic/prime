import { useFetch, usePost, usePut, useDelete } from "../../../utils";
import { pathToUrl } from "../../../utils/router";
import { User } from "../types";

const mainEntityUrl = "users";
const singleEntityUrl = `${mainEntityUrl}/:id`;

export const useGetUsers = () => useFetch<User[]>(pathToUrl(mainEntityUrl));

export const useAddUser = (
  updater: (oldData: User[], newData: User) => User[]
) => usePost<User[], User>(pathToUrl(mainEntityUrl), undefined, updater);

export const useGetUser = (id: number) =>
  useFetch<User>(pathToUrl(singleEntityUrl, { id }));

export const useEditUser = (
  updater: (oldData: User[], newData: User) => User[]
) => usePut<User[], User>(pathToUrl(mainEntityUrl), undefined, updater);

export const useDeleteUser = (
  updater: (oldData: User[], deletedId: string | number) => User[]
) => useDelete<User[]>(mainEntityUrl, undefined, updater);
