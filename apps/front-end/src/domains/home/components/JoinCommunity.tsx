import { Box, Container, VStack, Heading, Stack, Text } from '@chakra-ui/react';
import { useAppSelector } from '@frontend/store/hook';
import React from 'react';
import CallToAction from './CallToAction';

const JoinCommunity = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user);
  return (
    <>
      {!isAuthenticated && (
        <Box py={20} bg="gray.800" color="white">
          <Container maxW="4xl" textAlign="center">
            <VStack spacing={8}>
              <Heading fontSize={{ base: '3xl', md: '4xl' }}>
                Prêt à rejoindre la communauté ?
              </Heading>
              <Text fontSize="xl" maxW="600px">
                Commencez votre aventure gaming professionnelle dès aujourd'hui
                et connectez-vous avec les meilleurs du secteur.
              </Text>
              <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
                <CallToAction />
              </Stack>
            </VStack>
          </Container>
        </Box>
      )}
    </>
  );
};

export default JoinCommunity;
