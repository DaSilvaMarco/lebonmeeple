import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { toastError, toastSuccess } from '@/domains/shared/toat/toast';
import type { SignupFormData } from '@/domains/user/type';
import { schemaUserSignup } from '@/domains/user/type';
import { postSignup } from '@frontend/domains/user/api/post-signup';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { handleFileUpload } from './handleFileUpload';

export const useSignup = () => {
  const router = useRouter();
  const toast = useToast();
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid, dirtyFields },
  } = useForm<SignupFormData>({
    resolver: zodResolver(schemaUserSignup),
    mode: 'onTouched',
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      await postSignup(data);

      toastSuccess(
        toast,
        'Inscription réussie !',
        'Votre compte a été créé avec succès. Vous allez être redirigé vers la page de connexion.',
      );

      setTimeout(() => {
        router.push('/signin');
      }, 1000);
    } catch (error) {
      toastError(toast, "Erreur lors de l'inscription : ", `${error.message}`);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await handleFileUpload(e, toast, setValue, setSelectedFileName);
  };

  return {
    register,
    handleSubmit,
    setValue,
    errors,
    isSubmitting,
    isValid,
    dirtyFields,
    onSubmit,
    handleUpload,
    selectedFileName,
    setSelectedFileName,
    fileInputRef,
  };
};
