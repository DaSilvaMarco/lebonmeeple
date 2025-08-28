'use client';

import React from 'react';
import {
  Flex,
  Box,
  Center,
  Heading,
  VStack,
  Button,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import NotConnected from '@frontend/domains/shared/warning/NotConnected';
import { useProfileEdit } from '../services/useProfileEdit';
import ProfileUsernameField from '../components/ProfileUsernameField';
import ProfileEmailField from '../components/ProfileEmailField';
import ProfileAvatarField from '../components/ProfileAvatarField';

const ProfileEditPage = () => {
  const {
    user,
    isAuthenticated,
    selectedFileName,
    fileInputRef,
    register,
    handleSubmit,
    errors,
    isValid,
    isDirty,
    handleUpload,
    onSubmit,
  } = useProfileEdit();

  const textColorPrimary = useColorModeValue('neutral.800', 'white');

  return (
    <>
      {!isAuthenticated || !user ? (
        <NotConnected />
      ) : (
        <>
          <Flex justifyContent="center">
            <Box w={{ base: '100%', md: '40%' }}>
              <Center>
                <Heading>Modifier le profil</Heading>
              </Center>
              <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing="4">
                  <ProfileUsernameField errors={errors} register={register} />

                  <ProfileEmailField errors={errors} register={register} />

                  <ProfileAvatarField
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

                  <Button
                    disabled={!(isValid && isDirty)}
                    type="submit"
                    colorScheme="brand"
                  >
                    Modifier le profil
                  </Button>
                </VStack>
              </form>
            </Box>
          </Flex>
        </>
      )}
    </>
  );
};

export default ProfileEditPage;
