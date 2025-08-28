import { useRef, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@frontend/store/hook';
import { toastError, toastSuccess } from '@frontend/domains/shared/toat/toast';
import { patchUser } from '../api/patch-user';
import { updateUser } from '../slice';
import type { UserProfileFormData } from '../type';
import { userProfileUpdateSchema } from '../type';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { handleFileUpload } from './handleFilUpload';

export const useProfileEdit = () => {
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { user, isAuthenticated, token } = useAppSelector(
    (state) => state.user,
  );
  const toast = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isDirty },
  } = useForm<UserProfileFormData>({
    resolver: zodResolver(userProfileUpdateSchema),
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
      avatar: user?.avatar || '',
    },
    mode: 'onChange',
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await handleFileUpload(e, toast, setValue, setSelectedFileName);
  };

  const onSubmit = async (data: UserProfileFormData) => {
    try {
      if (!token) {
        toastError(
          toast,
          "Erreur d'authentification",
          'Vous devez être connecté pour modifier votre profil.',
        );
        return;
      }

      const newUser = await patchUser(data, token);

      dispatch(updateUser(newUser));
      toastSuccess(
        toast,
        'Modification réussie !',
        'Votre profil a été mis à jour.',
      );

      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (error) {
      toastError(toast, 'Erreur de connexion', `${error.message}`);
    }
  };

  return {
    user,
    isAuthenticated,
    selectedFileName,
    fileInputRef,
    register,
    handleSubmit,
    setValue,
    errors,
    isValid,
    isDirty,
    handleUpload,
    onSubmit,
  };
};
