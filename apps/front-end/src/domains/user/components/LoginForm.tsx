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
  useColorModeValue,
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
import { useThemeColors } from '@/ui/hooks';
import Button from '@frontend/domains/shared/button/components/Button';

const LoginForm = () => {
  const router = useRouter();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading } = useAppSelector((state) => state.user);

  const { textColorPrimary, textColor, cardBg } = useThemeColors();

  const inputBg = useColorModeValue('gray.50', 'gray.700');
  const inputBorderColor = useColorModeValue('gray.300', 'gray.600');
  const linkColor = useColorModeValue('brand.500', 'brand.300');

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
          <FormLabel
            htmlFor="email"
            color={textColorPrimary}
            fontWeight="semibold"
            fontSize="sm"
          >
            Adresse e-mail
          </FormLabel>
          <InputGroup>
            <Input
              id="email"
              type="email"
              placeholder="votre.email@exemple.com"
              autoComplete="email"
              bg={inputBg}
              border="2px"
              borderColor={errors.email ? 'red.300' : inputBorderColor}
              _hover={{
                borderColor: errors.email ? 'red.400' : 'brand.300',
              }}
              _focus={{
                borderColor: errors.email ? 'red.500' : 'brand.500',
                bg: cardBg,
                shadow: 'lg',
              }}
              size="lg"
              borderRadius="lg"
              fontSize="md"
              {...register('email')}
            />
          </InputGroup>
          <FormErrorMessage fontSize="sm" mt={2}>
            {errors.email?.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel
            htmlFor="password"
            color={textColorPrimary}
            fontWeight="semibold"
            fontSize="sm"
          >
            Mot de passe
          </FormLabel>
          <InputGroup>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Votre mot de passe"
              autoComplete="current-password"
              bg={inputBg}
              border="2px"
              borderColor={errors.password ? 'red.300' : inputBorderColor}
              _hover={{
                borderColor: errors.password ? 'red.400' : 'brand.300',
              }}
              _focus={{
                borderColor: errors.password ? 'red.500' : 'brand.500',
                bg: cardBg,
                shadow: 'lg',
              }}
              size="lg"
              borderRadius="lg"
              fontSize="md"
              {...register('password')}
            />
            <InputRightElement h="full">
              <IconButton
                aria-label={
                  showPassword
                    ? 'Masquer le mot de passe'
                    : 'Afficher le mot de passe'
                }
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                variant="ghost"
                onClick={() => setShowPassword(!showPassword)}
                color={textColor}
                _hover={{ color: textColorPrimary }}
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage fontSize="sm" mt={2}>
            {errors.password?.message}
          </FormErrorMessage>
        </FormControl>

        {/* Lien mot de passe oublié */}
        <Box w="full" textAlign="right">
          <Link href="/forgot-password">
            <Text
              fontSize="sm"
              color={linkColor}
              _hover={{ textDecoration: 'underline' }}
              cursor="pointer"
            >
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
