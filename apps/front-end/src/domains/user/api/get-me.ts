import { API_USER_ME, GET_METHOD } from '../constants';
import { type Me } from '../type';

export const getMe = async (token: string): Promise<Me> => {
  const me = await fetch(API_USER_ME, {
    method: GET_METHOD,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return await me.json();
};
