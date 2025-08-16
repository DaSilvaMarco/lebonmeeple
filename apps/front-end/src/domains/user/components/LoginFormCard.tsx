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
    <Flex align="center" justify="center">
      <Box
        w={{ base: '100%', md: '800px' }}
        minH={{ base: 'auto', md: '600px' }}
        display="flex"
        flexDirection={{ base: 'column', md: 'row' }}
        borderRadius="2xl"
        boxShadow="lg"
        overflow="hidden"
        bg="white"
        border="1px solid"
        borderColor="gray.200"
      >
        <Box
          flex={1}
          bg="peach.200"
          color="gray.800"
          p={{ base: 6, md: 10 }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
          minW={{ base: '100%', md: '340px' }}
        >
          <Text fontSize="2xl" fontWeight="bold" mb={6} color="gray.700">
            Bienvenue sur LeBonMeeple !
          </Text>
          <VStack align="start" spacing={6}>
            {features.map((f, i) => (
              <Box key={i} display="flex" alignItems="center">
                <Box mr={4}>{f.icon}</Box>
                <Box>
                  <Text fontWeight="semibold" fontSize="lg">
                    {f.title}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
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
          bg="white"
        >
          <Box w="100%" maxW="350px">
            <LoginForm />
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default LoginFormCard;
