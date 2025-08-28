import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

type Props = {
  errors: FieldErrors<{
    username: string;
  }>;
  register: UseFormRegister<{ username: string; email: string; avatar?: string | undefined }>;
};

const ProfileUsernameField = (props: Props) => {
  const { errors, register } = props;

  return (
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
  );
};

export default ProfileUsernameField;
