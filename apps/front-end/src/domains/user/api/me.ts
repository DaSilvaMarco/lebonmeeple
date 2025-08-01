import { API_USER_ME, GET_METHOD } from '../constants';

export const meAPI = async (token: string) => {
  const me = await fetch(API_USER_ME, {
    method: GET_METHOD,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return await me.json();
};
