import { type InitialStatePost } from './type';
import { getApiBaseUrl } from '@/utils/api-config';

export const API_POSTS = () => `${getApiBaseUrl()}/posts`;

//todo : clean
export const GET_METHOD = 'GET';
export const POST_METHOD = 'POST';
export const PATCH_METHOD = 'PATCH';
export const DELETE_METHOD = 'DELETE';

export const initialState: InitialStatePost = {
  posts: [],
};
