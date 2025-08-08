import { getApiBaseUrl } from '@/utils/api-config';

export type UpdatePostData = {
  title?: string;
  body?: string;
  image?: string;
};

export const updatePost = async (
  postId: number,
  data: UpdatePostData,
  token: string,
) => {
  const response = await fetch(`${getApiBaseUrl()}/post/${postId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erreur lors de la mise à jour');
  }

  return response.json();
};
