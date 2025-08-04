import { getMe } from '../api/get-me';
import { postSignin } from '../api/post-signin';
import { type LoginFormData } from '../type';

export const signinAndGetMe = async (data: LoginFormData) => {
  const user = await postSignin(data);
  const { token } = user;
  const me = await getMe(token);
  const { id, email, username } = me;

  return {
    user: { id, email, username },
    token,
  };
};
