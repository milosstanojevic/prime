import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NormalizerUserRequest, NormalizerUsersRequest } from "../actions";
import { User } from "../types";
import { entitiesSuccess, entitySuccess } from "../../utils";

interface IUserReducer {
  items: Array<User>,
  isLoading: boolean,
  error: boolean,
}

const initialState: IUserReducer = {
  items: [],
  isLoading: false,
  error: false,
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true
    },
    hasError: (state) => {
      state.error = true
      state.isLoading = false
    },
    usersSuccess: (state, { payload }: PayloadAction<NormalizerUsersRequest>) => {
      state.items = entitiesSuccess(payload.entities.users)
      state.isLoading = false;
    },
    userSuccess: (state, { payload }: PayloadAction<NormalizerUserRequest>) => {
      state.items = entitySuccess(state.items, payload.result, payload.entities.users)
      state.isLoading = false
    },
  }
});
