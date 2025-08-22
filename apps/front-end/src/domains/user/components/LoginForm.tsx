'use client';

import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FaLock } from 'react-icons/fa';
import { toastError, toastSuccess } from '@/domains/shared/toat/toast';
import { LoginFormData, schemaUserLogin } from '@/domains/user/type';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import Button from '@frontend/domains/shared/button/components/Button';
import Loader from '@frontend/domains/shared/loader/components/Loader';
import { postSignin } from '../api/post-signin';
import { getMe } from '../api/get-me';
import { login } from '../slice';

const LoginForm = () => {
  const router = useRouter();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
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
    setShowLoading(true);
    try {
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
          setShowLoading(false);
          router.push('/');
        }, 1000);
      } catch (error) {
        setShowLoading(false);
        toastError(toast, 'Erreur de connexion', error.message);
      }
    } catch (error) {
      setShowLoading(false);
      toastError(toast, 'Erreur de connexion', error.message);
    }
  };

  return (
    <Box position="relative">
      {showLoading && <Loader />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={6}>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel
              htmlFor="email"
              color="neutral.800"
              fontWeight="semibold"
            >
              Adresse e-mail
            </FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="votre.email@exemple.com"
              autoComplete="email"
              {...register('email')}
              data-testid="login-email-input"
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
                data-testid="login-password-input"
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
          <Button
            dataTestId="login-submit-button"
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
    </Box>
  );
};

export default LoginForm;
