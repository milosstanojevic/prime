import { RootState } from "../../../app";
import {createSelector} from "@reduxjs/toolkit";

export const getAllUsers = (state: RootState) => state.users.items

export const makeGetOrderById = () => {
  return createSelector(
    getAllUsers,
    (state: RootState, id: number) => id,
    (users, id) => {
      const user = users.find((user) => user.id === id)
      if (user) {
        return { ...user }
      }
      return {}
    }
  )
}
