'use client';

import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  FormErrorMessage,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

type Props = {
  errors: FieldErrors<{
    email: string;
    password: string;
  }>;
  register: UseFormRegister<{
    email: string;
    password: string;
  }>;
};

const SigninPasswordField = (props: Props) => {
  const { errors, register } = props;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl isInvalid={!!errors.password}>
      <FormLabel htmlFor="password" color="neutral.800" fontWeight="semibold">
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
  );
};

export default SigninPasswordField;
