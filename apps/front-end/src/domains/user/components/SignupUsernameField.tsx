import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  FormErrorMessage,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

type Props = {
  errors: FieldErrors<{
    username: string;
  }>;
  register: UseFormRegister<{
    username: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    avatar?: string | undefined;
  }>;
};

const SignupUsernameField = (props: Props) => {
  const { errors, register } = props;

  const textColorPrimary = useColorModeValue('neutral.800', 'white');
  const cardBg = useColorModeValue('white', 'neutral.800');

  const inputBg = useColorModeValue('gray.50', 'gray.700');
  const inputBorderColor = useColorModeValue('gray.300', 'gray.600');

  return (
    <FormControl isInvalid={!!errors.username}>
      <FormLabel
        htmlFor="username"
        color={textColorPrimary}
        fontWeight="semibold"
        fontSize="sm"
      >
        Pseudo
      </FormLabel>
      <InputGroup>
        <Input
          id="username"
          type="text"
          placeholder="Votre pseudo"
          autoComplete="username"
          bg={inputBg}
          border="2px"
          borderColor={errors.username ? 'red.300' : inputBorderColor}
          _hover={{
            borderColor: errors.username ? 'red.400' : 'brand.300',
          }}
          _focus={{
            borderColor: errors.username ? 'red.500' : 'brand.500',
            bg: cardBg,
            shadow: 'lg',
          }}
          size="lg"
          borderRadius="lg"
          fontSize="md"
          {...register('username')}
        />
      </InputGroup>
      <FormErrorMessage fontSize="sm" mt={2}>
        {errors.username?.message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default SignupUsernameField;
