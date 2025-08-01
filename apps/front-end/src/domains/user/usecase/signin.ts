import { signinAPI } from '../api/signin';
import { meAPI } from '../api/me';
import { LoginFormData } from '../type';

export const signin = async (data: LoginFormData) => {
  const signinResult = await signinAPI(data);

  const { token } = signinResult;
  const resultMe = await meAPI(token);

  return {
    user: {
      id: resultMe.id || '',
      username: resultMe.username || '',
      email: resultMe.email || '',
      avatar: resultMe.avatar || '',
    },
    token: token,
  };
};
