import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

type Props = {
  errors: FieldErrors<{
    email: string;
  }>;
  register: UseFormRegister<{ email: string; username: string; avatar?: string | undefined }>;
};

const ProfileEmailField = (props: Props) => {
  const { errors, register } = props;

  return (
    <FormControl isInvalid={!!errors.email}>
      <FormLabel htmlFor="email">Email</FormLabel>
      <Input {...register('email')} id="email" type="email" variant="filled" />
      <FormErrorMessage>
        {typeof errors.email?.message === 'string' ? errors.email.message : ''}
      </FormErrorMessage>
    </FormControl>
  );
};

export default ProfileEmailField;
