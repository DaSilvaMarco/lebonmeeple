import { API_GAMES, GET_METHOD } from '../constants';

export const getGames = async ({ limit = 9, page = 1 } = {}) => {
  if (process.env.CI_BUILD === 'true') {
    return [];
  }

  try {
    const url = new URL(API_GAMES(), window.location.origin);
    url.searchParams.append('limit', String(limit));
    url.searchParams.append('page', String(page));
    const games = await fetch(url.toString(), {
      method: GET_METHOD,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!games.ok) {
      throw new Error(`HTTP error! status: ${games.status}`);
    }

    return await games.json();
  } catch (error) {
    console.error('Error fetching games:', error);
    return [];
  }
};
