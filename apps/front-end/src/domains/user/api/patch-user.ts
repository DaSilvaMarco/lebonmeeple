import { API_USER_UPDATE, PATCH_METHOD } from '../constants';
import { type UpdatedUser, type UserProfileFormData } from '../type';
import { getMe } from './get-me';

export const patchUser = async (
  data: UserProfileFormData,
  token: string,
): Promise<UpdatedUser> => {
  const { email, username, avatar } = data;
  const me = await getMe(token);

  const updateUserResponse = await fetch(
    API_USER_UPDATE.replace('{id}', String(me.id)),
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
