'use client';

import React from 'react';
import {
  Flex,
  Box,
  Center,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Card,
  CardBody,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toastError, toastSuccess } from '@/domains/shared/toat/toast';
import { patchUser } from '@frontend/domains/user/api/patch-user';
import {
  UserProfileFormData,
  userProfileUpdateSchema,
} from '@/domains/user/type';
import { useAppDispatch } from '@frontend/store/hook';
import { updateUser } from '@frontend/domains/user/slice';
import { useAppSelector } from '@/store/hook';

const UpdateProfile = () => {
  const { user, isAuthenticated, token } = useAppSelector((state) => state.user);
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
    const file = e.target.files?.[0];
    if (file) {
      // Ici vous pouvez implémenter votre logique d'upload
      // Pour l'instant, on retourne juste le nom du fichier
      setValue('avatar', file.name);
    }
  };

  const onSubmit = async (data: UserProfileFormData) => {
    try {
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
    return (
      <Card>
        <CardBody>
          <Text>Vous n'êtes pas connecté.</Text>
          <Button
            mt={4}
            colorScheme="brand"
            onClick={() => router.push('/login')}
          >
            Se connecter
          </Button>
        </CardBody>
      </Card>
    );
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

            <FormControl isInvalid={!!errors.avatar} mb="30px">
              <FormLabel htmlFor="avatar">Avatar</FormLabel>
              <Input type="file" accept="image/*" onChange={handleFileUpload} />
              <FormErrorMessage>
                {typeof errors.avatar?.message === 'string'
                  ? errors.avatar.message
                  : ''}
              </FormErrorMessage>
            </FormControl>

            <Button
              disabled={!(isValid && isDirty)}
              type="submit"
              width="100%"
              colorScheme="brand"
            >
              Modifier le profil
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default UpdateProfile;
