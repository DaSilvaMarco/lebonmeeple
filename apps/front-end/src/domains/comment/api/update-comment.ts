import { PATCH_METHOD } from '../constants';
import { getApiBaseUrl } from '@/utils/api-config';
import type { CreateCommentDto } from '../type';

export const updateComment = async (
  commentId: number,
  commentData: CreateCommentDto,
  token: string,
) => {
  const response = await fetch(`${getApiBaseUrl()}/comment/${commentId}`, {
    method: PATCH_METHOD,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(commentData),
  });

  if (!response.ok) {
    throw new Error(
      `Erreur ${response.status}: Impossible de modifier le commentaire`,
    );
  }

  return await response.json();
};
