import { type InitialStatePost } from './type';

export const API_POSTS = 'http://localhost:3000/posts';

//todo : clean
export const GET_METHOD = 'GET';
export const POST_METHOD = 'POST';
export const PATCH_METHOD = 'PATCH';
export const DELETE_METHOD = 'DELETE';

export const initialState: InitialStatePost = {
  posts: [],
};
