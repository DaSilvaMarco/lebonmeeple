import { API_USER_SIGNIN, POST_METHOD } from '../constants';
import { type LoginFormData } from '../type';

export const signinAPI = async (data: LoginFormData) => {
  const signinResponse = await fetch(API_USER_SIGNIN, {
    method: POST_METHOD,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });

  return await signinResponse.json();
};
