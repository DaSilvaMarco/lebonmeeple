import { API_USER_UPDATE, PATCH_METHOD } from '../constants';
import { type UserProfileFormData } from '../type';
import { meAPI } from './me';

export const updateUserAPI = async (
  data: UserProfileFormData,
  token: string,
) => {
  const { email, username, avatar } = data;
  const me = await meAPI(token);

  const updateUserResponse = await fetch(
    API_USER_UPDATE.replace('{id}', me.id),
    {
      method: PATCH_METHOD,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email,
        username,
        avatar,
      }),
    },
  );

  return await updateUserResponse.json();
};
