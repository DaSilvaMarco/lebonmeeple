import { GET_METHOD } from '../constants';
import { getApiBaseUrl } from '@/utils/api-config';

export const getGame = async (id: string) => {
  const response = await fetch(`${getApiBaseUrl()}/game/${id}`, {
    method: GET_METHOD,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Erreur ${response.status}: Jeu non trouvé`);
  }

  return await response.json();
};
