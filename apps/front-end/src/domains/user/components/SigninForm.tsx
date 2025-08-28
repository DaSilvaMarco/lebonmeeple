'use client';

import React from 'react';
import { Box, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaLock } from 'react-icons/fa';
import { LoginFormData, schemaUserLogin } from '@/domains/user/type';
import { Button } from '@chakra-ui/react';
import Loader from '@frontend/domains/shared/loader/components/Loader';
import { useLogin } from '../service/useLogin';
import SigninEmailField from './SigninEmailField';
import SigninPasswordField from './SigninPasswordField';

const 
SigninForm = () => {
  const { handleLogin, isLoading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, dirtyFields },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schemaUserLogin),
    mode: 'onTouched',
  });

  const onSubmit = async (data: LoginFormData) => {
    handleLogin(data);
  };

  return (
    <Box>
      {isLoading && <Loader />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={6}>
          <SigninEmailField errors={errors} register={register} />
          <SigninPasswordField errors={errors} register={register} />

          <Button
            leftIcon={<FaLock />}
            type="submit"
            colorScheme="primary"
            data-testid="login-submit-button"
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

export default SigninForm;
