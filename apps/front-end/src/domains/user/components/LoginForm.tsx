'use client';

import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  VStack,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FaLock } from 'react-icons/fa';
import { toastSuccess, toastError } from '@/domains/shared/toat/toast';
import { LoginFormData, schemaUserLogin } from '@/domains/user/type';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { login } from '@/domains/user/slice';
import { signinAndGetMe } from '@frontend/domains/user/service/service';
import Button from '@frontend/domains/shared/button/components/Button';

const LoginForm = () => {
  const router = useRouter();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
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
      const user = await signinAndGetMe(data);
      dispatch(login(user));
      toastSuccess(
        toast,
        'Connexion réussie !',
        'Vous êtes maintenant connecté.',
      );

      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Une erreur est survenue';
      toastError(toast, 'Erreur de connexion', errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={6}>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel htmlFor="email" color="neutral.800" fontWeight="semibold">
            Adresse e-mail
          </FormLabel>
          <Input
            id="email"
            type="email"
            placeholder="votre.email@exemple.com"
            autoComplete="email"
            {...register('email')}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel
            htmlFor="password"
            color="neutral.800"
            fontWeight="semibold"
          >
            Mot de passe
          </FormLabel>
          <InputGroup>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Votre mot de passe"
              autoComplete="current-password"
              {...register('password')}
            />
            <InputRightElement>
              <IconButton
                aria-label={
                  showPassword
                    ? 'Masquer le mot de passe'
                    : 'Afficher le mot de passe'
                }
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                variant="ghost"
                onClick={() => setShowPassword(!showPassword)}
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        {/* Lien mot de passe oublié */}
        <Box w="full" textAlign="right">
          <Link href="/forgot-password">
            <Text fontSize="sm" color="primary.500" cursor="pointer">
              Mot de passe oublié ?
            </Text>
          </Link>
        </Box>

        <Button
          type="submit"
          color="primary"
          icon={<FaLock />}
          isDisabled={!isValid || Object.keys(dirtyFields).length === 0}
          isLoading={isSubmitting || isLoading}
        >
          Se connecter
        </Button>
      </VStack>
    </form>
  );
};

export default LoginForm;
