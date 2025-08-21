import { getMe } from '../api/get-me';
import { postSignin } from '../api/post-signin';
import { type LoginFormData } from '../type';

export const signinAndGetMe = async (data: LoginFormData) => {
  const signin = await postSignin(data);
  const { token, userStorage } = signin;
  const me = await getMe(token);
  const { id, email, username } = me;

  return {
    user: {
      id,
      email,
      username,
      avatar: userStorage.avatar || '/defaultAvatar.jpg',
      roles: userStorage.roles,
    },
    token,
  };
};
