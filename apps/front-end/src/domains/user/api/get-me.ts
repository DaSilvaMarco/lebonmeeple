import { API_USER_ME, GET_METHOD } from '../constants';
import { type Me } from '../type';

export const getMe = async (token: string): Promise<Me> => {
  try {
    const me = await fetch(API_USER_ME(), {
      method: GET_METHOD,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!me.ok) {
      throw new Error(
        `Erreur lors de la récupération des informations utilisateur: ${me.statusText}`,
      );
    }

    return await me.json();
  } catch (error) {
    throw new Error(
      `Erreur lors de la récupération des informations utilisateur: ${error}`,
    );
  }
};
