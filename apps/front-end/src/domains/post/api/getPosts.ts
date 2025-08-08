import { API_POSTS, GET_METHOD } from '../constants';

export const getPosts = async () => {
  if (process.env.CI_BUILD === 'true') {
    return [];
  }

  try {
    const posts = await fetch(API_POSTS(), {
      method: GET_METHOD,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!posts.ok) {
      throw new Error(`HTTP error! status: ${posts.status}`);
    }

    return await posts.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};
