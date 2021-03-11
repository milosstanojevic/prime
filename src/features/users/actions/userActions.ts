import { AppDispatch, AppThunk } from "../../../app";
import { User } from "../types";
import { request } from "../../../api";
import { schemas } from "../schemas"
import { userSlice } from "../slices";

export interface NormalizerUsersRequest {
  result: number[];
  entities: {
    users: { [id: number]: User },
  };
}

export interface NormalizerUserRequest {
  result: number;
  entities: {
    users: { [id: number]: User },
  };
}

const { actions } = userSlice

export const addUser = (newUser: User): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const response: Object = await request('users', {
      schema: schemas.USER,
      method: 'POST',
      payload: newUser,
    })
    dispatch(actions.userSuccess(response as NormalizerUserRequest))
  } catch (error) {
    dispatch(actions.hasError())
  }
}

export const fetchUsers = (): AppThunk => async (dispatch:AppDispatch) => {
  dispatch(actions.startLoading())
  try {
    const response: Object = await request('users', {schema: schemas.USERS})
    dispatch(actions.usersSuccess(response as NormalizerUsersRequest))
  } catch (error) {
    dispatch(actions.hasError())
  }
}

export const fetchUser = (id: number): AppThunk => async (dispatch:AppDispatch) => {
  dispatch(actions.startLoading())
  try {
    const response: Object = await request(`users/${id}`, {schema: schemas.USER})
    dispatch(actions.userSuccess(response as NormalizerUserRequest))
  } catch (error) {
    dispatch(actions.hasError())
  }
}
