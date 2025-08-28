'use client';

import React from 'react';
import { useColorModeValue, Flex, Box, Text, Button } from '@chakra-ui/react';
import { FaUserPlus } from 'react-icons/fa';
import { useAppSelector } from '@/store/hook';
import Link from 'next/link';
import SignupEmailField from './SignupEmailField';
import SignupPasswordField from './SignupPasswordField';
import SignupPasswordConfirmationField from './SignupPasswordConfirmationField';
import SignupUsernameField from './SignupUsernameField';
import SignupAvatarField from './SignupAvatarField';

import { useSignup } from '../service/useSignup';

const SignupForm = () => {
  const { isLoading } = useAppSelector((state) => state.user);
  const textColorPrimary = useColorModeValue('neutral.800', 'white');
  const linkColor = useColorModeValue('brand.500', 'brand.300');
  const textColor = useColorModeValue('neutral.600', 'white');

  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isValid,
    dirtyFields,
    onSubmit,
    handleUpload,
    selectedFileName,
    fileInputRef,
  } = useSignup();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        flexWrap="wrap"
        gap={6}
        mb={6}
      >
        <Flex direction="column" flex="1" minW={0} gap={6}>
          <SignupUsernameField errors={errors} register={register} />
          <SignupPasswordField errors={errors} register={register} />
        </Flex>
        <Flex direction="column" flex="1" minW={0} gap={6}>
          <SignupEmailField errors={errors} register={register} />
          <SignupPasswordConfirmationField
            errors={errors}
            register={register}
          />
        </Flex>
      </Flex>
      <Box mb={6}>
        <SignupAvatarField
          errors={errors}
          fileInputRef={fileInputRef}
          onChange={handleUpload}
        />
        <Text
          fontSize="sm"
          color={selectedFileName ? textColorPrimary : 'neutral.400'}
          mt={2}
        >
          {selectedFileName || 'Aucun fichier sélectionné'}
        </Text>
      </Box>
      <Box textAlign="center">
        <Button
          data-testid="signup-submit-button"
          type="submit"
          colorScheme="primary"
          rightIcon={<FaUserPlus />}
          isDisabled={!isValid || Object.keys(dirtyFields).length === 0}
          isLoading={isSubmitting || isLoading}
        >
          M'inscrire
        </Button>
        <Box mt={4}>
          <Link href="/signin">
            <Text fontSize="sm" color="primary.500" cursor="pointer">
              Déjà un compte ? Se connecter
            </Text>
          </Link>
        </Box>
      </Box>
      <Text fontSize="xs" color={textColor} textAlign="center" mt={4}>
        En vous inscrivant, vous acceptez nos{' '}
        <Link href="/terms">
          <Text as="span" color={linkColor} textDecoration="underline">
            conditions d'utilisation
          </Text>
        </Link>{' '}
        et notre{' '}
        <Link href="/privacy">
          <Text as="span" color={linkColor} textDecoration="underline">
            politique de confidentialité
          </Text>
        </Link>
      </Text>
    </form>
  );
};

export default SignupForm;
