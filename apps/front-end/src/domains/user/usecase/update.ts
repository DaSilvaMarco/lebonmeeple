import { updateUserAPI } from '../api/update';
import { type UserProfileFormData } from '../type';

export const update = async (data: UserProfileFormData, token: string) => {
  const newUser = await updateUserAPI(data, token);

  return {
    user: {
      id: newUser.id || '',
      username: newUser.username || '',
      email: newUser.email || '',
      avatar: newUser.avatar || '',
    },
    token,
  };
};
