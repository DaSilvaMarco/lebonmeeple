'use client';

import React from 'react';
import { Box, Flex, VStack, Text } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FaLock } from 'react-icons/fa';
import LoginForm from './LoginForm';

const features = [
  {
    icon: <FaLock size={22} color="#3182ce" />, // Exemple d'icône
    title: 'Sécurité',
    desc: 'Connexion sécurisée et gestion des comptes.',
  },
  {
    icon: <ViewIcon boxSize={6} color="green.400" />,
    title: 'Découverte',
    desc: 'Explorez et partagez des jeux de société.',
  },
  {
    icon: <ViewOffIcon boxSize={6} color="purple.400" />,
    title: 'Communauté',
    desc: 'Rejoignez une communauté de passionnés.',
  },
  {
    icon: <FaLock size={22} color="#e53e3e" />,
    title: 'Avis & Commentaires',
    desc: 'Laissez des avis et consultez ceux des autres.',
  },
];

const LoginFormCard = () => {
  return (
    <Flex minH="100vh" align="center" justify="center">
      <Box
        w={{ base: '95%', sm: '90%', md: '850px' }}
        minH={{ base: 'auto', md: '600px' }}
        display="flex"
        flexDirection={{ base: 'column-reverse', md: 'row' }}
        borderRadius="2xl"
        boxShadow="2xl"
        overflow="hidden"
        bg="whiteAlpha.900"
        border="1px solid"
        borderColor="gray.200"
        gap={{ base: 0, md: 8 }}
        mt={{ base: 8, md: 0 }}
        mb={{ base: 8, md: 0 }}
      >
        {/* Bloc de gauche : Features */}
        <Box
          flex={1}
          bgGradient="linear(to-br, orange.100, pink.100)"
          color="gray.800"
          p={{ base: 6, md: 10 }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems={{ base: 'center', md: 'flex-start' }}
          minW={{ base: '100%', md: '340px' }}
        >
          <Text
            fontSize={{ base: 'xl', md: '2xl' }}
            fontWeight="bold"
            mb={6}
            color="gray.700"
            textAlign={{ base: 'center', md: 'left' }}
          >
            Bienvenue sur LeBonMeeple !
          </Text>
          <VStack align={{ base: 'center', md: 'start' }} spacing={6} w="100%">
            {features.map((f, i) => (
              <Box key={i} display="flex" alignItems="center" w="100%">
                <Box
                  mr={4}
                  bg="white"
                  borderRadius="full"
                  boxShadow="md"
                  p={2}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  minW="44px"
                  minH="44px"
                >
                  {f.icon}
                </Box>
                <Box>
                  <Text
                    fontWeight="semibold"
                    fontSize={{ base: 'md', md: 'lg' }}
                  >
                    {f.title}
                  </Text>
                  <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.600">
                    {f.desc}
                  </Text>
                </Box>
              </Box>
            ))}
          </VStack>
        </Box>
        <Box
          flex={1}
          p={{ base: 6, md: 10 }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="whiteAlpha.900"
        >
          <Box
            w="100%"
            maxW="370px"
            boxShadow="md"
            borderRadius="xl"
            p={{ base: 4, md: 6 }}
            bg="white"
          >
            <Text
              display={{ base: 'block', md: 'none' }}
              fontWeight="bold"
              fontSize="lg"
              mb={4}
              textAlign="center"
              color="gray.700"
            >
              Connexion à votre compte
            </Text>
            <LoginForm />
            <Text mt={6} fontSize="sm" color="gray.600" textAlign="center">
              Vous n'avez pas encore de compte ?{' '}
              <a
                href="/signup"
                style={{ color: '#3182ce', textDecoration: 'underline' }}
              >
                Créer un compte
              </a>
            </Text>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default LoginFormCard;
