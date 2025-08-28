import { GET_METHOD } from '../constants';
import { getApiBaseUrl } from '@/utils/api-config';

export const getPostById = async (id: string) => {
  try {
    const response = await fetch(`${getApiBaseUrl()}/post/${id}`, {
      method: GET_METHOD,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: Post non trouvé`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch post: ${error.message}`);
  }
};
