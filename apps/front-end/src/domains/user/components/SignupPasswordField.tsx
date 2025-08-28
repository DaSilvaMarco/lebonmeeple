import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  FormErrorMessage,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
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

const SignupPasswordField = (props: Props) => {
  const { errors, register } = props;

  const [showPassword, setShowPassword] = useState(false);

  const inputBg = useColorModeValue('gray.50', 'gray.700');
  const inputBorderColor = useColorModeValue('gray.300', 'gray.600');
  const cardBg = useColorModeValue('white', 'neutral.800');
  const textColorPrimary = useColorModeValue('neutral.800', 'white');
  const textColor = useColorModeValue('neutral.600', 'white');

  return (
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
          autoComplete="new-password"
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
  );
};

export default SignupPasswordField;
