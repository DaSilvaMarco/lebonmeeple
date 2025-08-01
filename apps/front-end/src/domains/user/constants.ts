import { type UserState } from './type';

export const API_USER_ME = 'http://localhost:3000/user/me';
export const API_USER_SIGNIN = 'http://localhost:3000/user/signin';
export const API_USER_UPDATE = 'http://localhost:3000/user/{id}';

export const GET_METHOD = 'GET';
export const POST_METHOD = 'POST';
export const PATCH_METHOD = 'PATCH';
export const DELETE_METHOD = 'DELETE';

export const initialState: UserState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
};
