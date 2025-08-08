import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialState } from './constants';
import { type UpdatedUser, type User, type UserState } from './type.js';

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      localStorage.setItem('authToken', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;

      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    },

    updateUser: (state, action: PayloadAction<UpdatedUser>) => {
      if (state.user) {
        const updatedUser: User = {
          ...state.user,
          ...action.payload,
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        state.user = updatedUser;
      }
    },
  },
});

export const { login, logout, updateUser } = userSlice.actions;

export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectToken = (state: { user: UserState }) => state.user.token;
export const selectIsAuthenticated = (state: { user: UserState }) =>
  state.user.isAuthenticated;
export const selectIsLoading = (state: { user: UserState }) =>
  state.user.isLoading;

export default userSlice.reducer;
