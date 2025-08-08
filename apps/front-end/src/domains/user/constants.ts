import { type UserState } from './type';
import { getApiBaseUrl } from '@/utils/api-config';

export const API_USER_ME = () => `${getApiBaseUrl()}/user/me`;
export const API_USER_SIGNIN = () => `${getApiBaseUrl()}/user/signin`;
export const API_USER_UPDATE = () => `${getApiBaseUrl()}/user/{id}`;
export const API_USER_SIGNUP = () => `${getApiBaseUrl()}/user/signup`;

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
