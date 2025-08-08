import { POST_METHOD } from '../constants';
import { getApiBaseUrl } from '@/utils/api-config';
import type { CreateCommentDto } from '../type';

export const createComment = async (
  postId: number,
  commentData: CreateCommentDto,
  token: string,
) => {
  const response = await fetch(`${getApiBaseUrl()}/post/${postId}/comment`, {
    method: POST_METHOD,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(commentData),
  });

  if (!response.ok) {
    throw new Error(
      `Erreur ${response.status}: Impossible de créer le commentaire`,
    );
  }

  return await response.json();
};
