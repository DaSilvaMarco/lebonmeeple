'use client';

import React from 'react';
import {
  Box,
  Flex,
  Heading,
  VStack,
  Text,
  Button,
  HStack,
  Badge,
} from '@chakra-ui/react';
import Link from 'next/link';
import HomeCard from '../domains/home/components/HomeCard';
import { homeData } from '../domains/home/data/home-data';
import { useAuth } from '../hooks/useAuth';

const App = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <>
      <Flex w="90%" m="auto" direction="column" p="10px 0">
        {/* Section d'accueil avec état d'authentification */}
        {isAuthenticated && user && (
          <Box
            mb={6}
            p={4}
            bg="brand.50"
            borderRadius="lg"
            border="1px"
            borderColor="brand.200"
          >
            <HStack justify="space-between" align="center">
              <VStack align="start" spacing={1}>
                <Text fontSize="lg" fontWeight="semibold">
                  Bienvenue, {user.username} ! 👋
                </Text>
                <Text color="gray.600" fontSize="sm">
                  Connecté en tant que {user.email}
                </Text>
              </VStack>
              <Badge colorScheme="green" variant="subtle">
                Connecté
              </Badge>
            </HStack>
          </Box>
        )}

        <Box>
          <Heading fontSize="4xl" p="30px 0">
            Le blog des pros des jeux de société.
          </Heading>

          {/* Actions selon l'état d'authentification */}
          <Box mb={6}>
            {isAuthenticated ? (
              <HStack spacing={4} mb={4}>
                <Link href="/blog">
                  <Button colorScheme="brand">Voir tous les articles</Button>
                </Link>
                <Link href="/blog/create">
                  <Button variant="outline" colorScheme="brand">
                    Écrire un article
                  </Button>
                </Link>
              </HStack>
            ) : (
              <VStack spacing={4} align="start" mb={6}>
                <Text color="gray.600">
                  Connectez-vous pour créer et gérer vos articles de blog !
                </Text>
                <HStack spacing={4}>
                  <Link href="/login">
                    <Button colorScheme="brand">Se connecter</Button>
                  </Link>
                  <Link href="/signup">
                    <Button variant="outline" colorScheme="brand">
                      Créer un compte
                    </Button>
                  </Link>
                </HStack>
              </VStack>
            )}
          </Box>

          <Flex
            direction={{ base: 'column', md: 'row' }}
            flexWrap={{ base: 'wrap' }}
            justifyContent={{ md: 'space-between' }}
          >
            {homeData.map((element, index) => (
              <HomeCard key={index} text={element.text} image={element.image} />
            ))}
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default App;
