import { API_POSTS, GET_METHOD } from '../constants';

export const getPosts = async ({ limit = 9, page = 1 } = {}) => {
  if (process.env.CI_BUILD === 'true') {
    return [];
  }

  try {
    const url = new URL(API_POSTS(), window.location.origin);
    url.searchParams.append('limit', String(limit));
    url.searchParams.append('page', String(page));
    const posts = await fetch(url.toString(), {
      method: GET_METHOD,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!posts.ok) {
      throw new Error(`Erreur: ${posts.status}`);
    }

    return await posts.json();
  } catch (error) {
    throw new Error(`${error}`);
  }
};
