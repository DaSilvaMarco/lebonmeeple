import { type UserState } from './type';
import { getApiBaseUrl } from '@/utils/api-config';

const API_BASE = getApiBaseUrl();

export const API_USER_ME = `${API_BASE}/user/me`;
export const API_USER_SIGNIN = `${API_BASE}/user/signin`;
export const API_USER_UPDATE = `${API_BASE}/user/{id}`;
export const API_USER_SIGNUP = `${API_BASE}/user/signup`;

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
