import { getApiBaseUrl } from '@/utils/api-config';
import { DELETE_METHOD } from '../constants';

export const deletePost = async (postId: number, token: string) => {
  const response = await fetch(`${getApiBaseUrl()}/post/${postId}`, {
    method: DELETE_METHOD,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erreur lors de la suppression: ${errorText}`);
  }

  return response.json();
};
