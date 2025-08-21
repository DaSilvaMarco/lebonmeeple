import { API_USER_SIGNIN, POST_METHOD } from '../constants';
import { type LoginFormData, type Signin } from '../type';

export const postSignin = async (data: LoginFormData): Promise<Signin> => {
  try {
    const signinResponse = await fetch(API_USER_SIGNIN(), {
      method: POST_METHOD,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    if (!signinResponse.ok) {
      const errorData = await signinResponse.json();
      if (errorData && errorData.message) {
        throw new Error(`${errorData.message}`);
      }
    }
    return await signinResponse.json();
  } catch (error) {
    throw new Error(`${error}`);
  }
};
