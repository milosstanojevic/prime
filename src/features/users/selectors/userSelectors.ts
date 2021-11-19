import { RootState } from "../../../app";
import { createSelector } from "@reduxjs/toolkit";

export const getAllUsers = (state: RootState) => state.users.items;
export const getArticleIds = (state: RootState) => state.users.itemIds;

export const makeGetUserById = (id: number) => {
  return createSelector(getAllUsers, (users) => {
    const user = users.find((user) => user.id === id);
    if (user) {
      return { ...user };
    }
    return {};
  });
};
