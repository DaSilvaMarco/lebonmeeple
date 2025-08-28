import { useToast } from '@chakra-ui/react';
import { useAppDispatch } from '@frontend/store/hook';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toastError, toastSuccess } from '@/domains/shared/toat/toast';
import { postSignin } from '../api/post-signin';
import { type LoginFormData } from '../type';
import { login } from '../slice';
import { getMe } from '../api/get-me';

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      const signin = await postSignin(data);
      try {
        const me = await getMe(signin.token);
        const userRedux = {
          user: {
            id: me.id,
            email: me.email,
            username: me.username,
            avatar: signin.userStorage.avatar || '/defaultAvatar.jpg',
            roles: signin.userStorage.roles,
          },
          token: signin.token,
        };

        dispatch(login(userRedux));

        toastSuccess(
          toast,
          'Connexion réussie !',
          'Vous êtes maintenant connecté.',
        );

        setTimeout(() => {
          router.push('/');
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        setIsLoading(false);
        toastError(toast, 'Erreur de connexion', error.message);
      }
    } catch (error) {
      setIsLoading(false);
      toastError(toast, 'Login failed.', error.message);
    }
  };

  return { handleLogin, isLoading };
};
