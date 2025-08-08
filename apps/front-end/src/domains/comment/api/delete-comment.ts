import { DELETE_METHOD } from '../constants';
import { getApiBaseUrl } from '@/utils/api-config';

export const deleteComment = async (commentId: number, token: string) => {
  const response = await fetch(`${getApiBaseUrl()}/comment/${commentId}`, {
    method: DELETE_METHOD,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Erreur ${response.status}: Impossible de supprimer le commentaire`,
    );
  }

  return await response.json();
};
