import {
  Box,
  Container,
  VStack,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useAppSelector } from '@frontend/store/hook';
import React from 'react';
import CallToAction from './CallToAction';

const JoinCommunity = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const featuresBg = useColorModeValue('white', 'neutral.800');

  return (
    <>
      {!isAuthenticated && (
        <Box
          py={20}
          bg={featuresBg}
          as="section"
          role="region"
          aria-labelledby="join-community-heading"
        >
          <Container maxW="4xl" textAlign="center">
            <VStack spacing={8}>
              <Heading
                id="join-community-heading"
                fontSize={{ base: '3xl', md: '4xl' }}
              >
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
