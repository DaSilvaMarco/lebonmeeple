import { API_COMMENTS, GET_METHOD } from '../constants';

export const getComments = async () => {
  try {
    const comments = await fetch(API_COMMENTS(), {
      method: GET_METHOD,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!comments.ok) {
      throw new Error(`HTTP error! status: ${comments.status}`);
    }

    return await comments.json();
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};
