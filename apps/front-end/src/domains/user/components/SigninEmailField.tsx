import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import React from 'react';
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

const SigninEmailField = (props: Props) => {
  const { errors, register } = props;

  return (
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
        data-testid="login-email-input"
      />
      <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default SigninEmailField;
