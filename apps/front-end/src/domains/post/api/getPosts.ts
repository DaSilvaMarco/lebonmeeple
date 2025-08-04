import { API_POSTS, GET_METHOD } from '../constants';

export const getPosts = async () => {
  const posts = await fetch(API_POSTS, {
    method: GET_METHOD,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await posts.json();
};
