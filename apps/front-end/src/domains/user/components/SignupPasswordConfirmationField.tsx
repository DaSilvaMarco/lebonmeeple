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
    passwordConfirmation: string;
  }>;
  register: UseFormRegister<{
    username: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    avatar?: string | undefined;
  }>;
};

const SignupPasswordConfirmationField = (props: Props) => {
  const { errors, register } = props;

  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const textColorPrimary = useColorModeValue('neutral.800', 'white');
  const textColor = useColorModeValue('neutral.600', 'white');
  const cardBg = useColorModeValue('white', 'neutral.800');
  const inputBg = useColorModeValue('gray.50', 'gray.700');
  const inputBorderColor = useColorModeValue('gray.300', 'gray.600');

  return (
    <FormControl isInvalid={!!errors.passwordConfirmation}>
      <FormLabel
        htmlFor="passwordConfirmation"
        color={textColorPrimary}
        fontWeight="semibold"
        fontSize="sm"
      >
        Confirmer le mot de passe
      </FormLabel>
      <InputGroup>
        <Input
          id="passwordConfirmation"
          type={showPasswordConfirmation ? 'text' : 'password'}
          placeholder="Confirmez votre mot de passe"
          autoComplete="new-password"
          bg={inputBg}
          border="2px"
          borderColor={
            errors.passwordConfirmation ? 'red.300' : inputBorderColor
          }
          _hover={{
            borderColor: errors.passwordConfirmation ? 'red.400' : 'brand.300',
          }}
          _focus={{
            borderColor: errors.passwordConfirmation ? 'red.500' : 'brand.500',
            bg: cardBg,
            shadow: 'lg',
          }}
          size="lg"
          borderRadius="lg"
          fontSize="md"
          {...register('passwordConfirmation')}
        />
        <InputRightElement h="full">
          <IconButton
            aria-label={
              showPasswordConfirmation
                ? 'Masquer le mot de passe'
                : 'Afficher le mot de passe'
            }
            icon={showPasswordConfirmation ? <ViewOffIcon /> : <ViewIcon />}
            variant="ghost"
            onClick={() =>
              setShowPasswordConfirmation(!showPasswordConfirmation)
            }
            color={textColor}
            _hover={{ color: textColorPrimary }}
          />
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage fontSize="sm" mt={2}>
        {errors.passwordConfirmation?.message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default SignupPasswordConfirmationField;
