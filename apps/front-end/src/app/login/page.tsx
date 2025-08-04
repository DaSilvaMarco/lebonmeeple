'use client';

import React from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signin } from '@frontend/domains/user/api/post-signin';
import { toastSuccess, toastError } from '@/domains/shared/toat/toast';
import { LoginFormData, schemaUserLogin } from '@/domains/user/type';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { login } from '@/domains/user/slice';
import { getMe } from '@frontend/domains/user/api/get-me';

export default function LoginForm() {
  const router = useRouter();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, dirtyFields },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schemaUserLogin),
    mode: 'onTouched',
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const user = await signin(data);
      const { token } = user;
      const me = await getMe(token);
      const { id, email, username } = me;

      dispatch(login({ user: { id, email, username }, token }));
      toastSuccess(
        toast,
        'Connexion réussie !',
        'Vous êtes maintenant connecté.',
      );

      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (error) {
      toastError(toast, 'Erreur de connexion', error);
    }
  };

  return (
    <Flex align="center" justify="center">
      <Box bg="white" p={8} rounded="md" shadow="md" w="full" maxW="md">
        <Heading as="h2" mb={6} textAlign="center">
          Connexion
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input id="email" type="email" {...register('email')} />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">Mot de passe</FormLabel>
              <Input id="password" type="password" {...register('password')} />
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            <Button
              colorScheme="brand"
              variant="solid"
              type="submit"
              width="full"
              isLoading={isSubmitting || isLoading}
              isDisabled={!isValid || Object.keys(dirtyFields).length === 0}
            >
              Se connecter
            </Button>
          </VStack>
        </form>

        <Text mt={4} textAlign="center">
          Pas encore de compte ?{' '}
          <Link href="/signup">
            <Text as="u" color="brand.500" display="inline">
              Créer un compte
            </Text>
          </Link>
        </Text>
      </Box>
    </Flex>
  );
}
