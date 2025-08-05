import { API_USER_SIGNUP, POST_METHOD } from '../constants';
import { type Signup, type SignupFormData } from '../type';

export const postSignup = async (data: SignupFormData): Promise<Signup> => {
  const signupResponse = await fetch(API_USER_SIGNUP, {
    method: POST_METHOD,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: data.username,
      email: data.email,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
      avatar: data.avatar || '',
    }),
  });

  return await signupResponse.json();
};
