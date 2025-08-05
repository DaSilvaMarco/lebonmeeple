import { GET_METHOD } from '../constants';

export const getPostById = async (id: string) => {
  const response = await fetch(`http://localhost:3000/post/${id}`, {
    method: GET_METHOD,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Erreur ${response.status}: Post non trouvé`);
  }

  return await response.json();
};
