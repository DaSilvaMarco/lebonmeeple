'use client';

import React, { useRef, useState } from 'react';
import {
  useToast,
  Flex,
  Box,
  Center,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useColorModeValue,
  Text,
  Button as ChakraButton,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { toastSuccess, toastError } from '@frontend/domains/shared/toat/toast';
import NotConnected from '@frontend/domains/shared/warning/NotConnected';
import { useAppSelector, useAppDispatch } from '@frontend/store/hook';
import { patchUser } from '../api/patch-user';
import { updateUser } from '../slice';
import { UserProfileFormData, userProfileUpdateSchema } from '../type';
import { convertToBase64 } from '@frontend/utils/convertToBase64';
import Button from '@frontend/domains/shared/button/components/Button';

const ProfileEditPage = () => {
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const textColorPrimary = useColorModeValue('neutral.800', 'white');

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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        setSelectedFileName(null);
        setValue('avatar', '', { shouldValidate: true, shouldDirty: true });
        toastError(
          toast,
          "Mauvais type d'avatar",
          'Seuls les fichiers JPG, JPEG ou PNG sont autorisés.',
        );
        return;
      }
      try {
        setSelectedFileName(file.name);
        const base64 = await convertToBase64(file);
        setValue('avatar', base64, { shouldValidate: true, shouldDirty: true });
      } catch (error) {
        console.error('Erreur lors du téléchargement du fichier:', error);
      }
    }
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
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Une erreur inattendue s'est produite";
      toastError(toast, 'Erreur de connexion', errorMessage);
    }
  };

  if (!isAuthenticated || !user) {
    return <NotConnected />;
  }

  return (
    <Flex justifyContent="center">
      <Box w={{ base: '100%', md: '40%' }}>
        <Center>
          <Heading>Modifier le profil</Heading>
        </Center>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing="4">
            <FormControl isInvalid={!!errors.username}>
              <FormLabel htmlFor="username">Pseudo</FormLabel>
              <Input
                {...register('username')}
                id="username"
                type="text"
                variant="filled"
              />
              <FormErrorMessage>
                {typeof errors.username?.message === 'string'
                  ? errors.username.message
                  : ''}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                {...register('email')}
                id="email"
                type="email"
                variant="filled"
              />
              <FormErrorMessage>
                {typeof errors.email?.message === 'string'
                  ? errors.email.message
                  : ''}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.avatar}>
              <FormLabel
                htmlFor="avatar"
                color={textColorPrimary}
                fontWeight="semibold"
                fontSize="sm"
              >
                Avatar (optionnel)
              </FormLabel>
              <Box display="flex" alignItems="center" gap={4}>
                <input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                  data-testid="avatar-file-input"
                />
                <Button
                  type="button"
                  color="primary"
                  handleClick={() => fileInputRef.current?.click()}
                  dataTestId="avatar-upload-btn"
                >
                  Choisir un fichier
                </Button>
                <Text
                  fontSize="sm"
                  color={selectedFileName ? textColorPrimary : 'neutral.400'}
                >
                  {selectedFileName || 'Aucun fichier sélectionné'}
                </Text>
              </Box>
              <FormErrorMessage fontSize="sm" mt={2}>
                {typeof errors.avatar?.message === 'string'
                  ? errors.avatar.message
                  : ''}{' '}
              </FormErrorMessage>
            </FormControl>

            <ChakraButton
              disabled={!(isValid && isDirty)}
              type="submit"
              width="100%"
              colorScheme="brand"
            >
              Modifier le profil
            </ChakraButton>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default ProfileEditPage;
