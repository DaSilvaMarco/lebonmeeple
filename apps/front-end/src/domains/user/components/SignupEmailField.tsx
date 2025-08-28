import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

type Props = {
  errors: FieldErrors<{
    email: string;
    password: string;
  }>;
  register: UseFormRegister<{
    username: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    avatar?: string | undefined;
  }>;
};


const SignupEmailField = (props: Props) => {
  const { errors, register } = props;

  const inputBg = useColorModeValue('gray.50', 'gray.700');
  const inputBorderColor = useColorModeValue('gray.300', 'gray.600');
  const cardBg = useColorModeValue('white', 'neutral.800');
  const textColorPrimary = useColorModeValue('neutral.800', 'white');

  return (
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
  );
};

export default SignupEmailField;
