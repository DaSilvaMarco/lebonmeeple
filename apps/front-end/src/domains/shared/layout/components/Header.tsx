'use client';

import React from 'react';
import {
  Flex,
  Heading,
  Show,
  Avatar,
  HStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react';
import Link from 'next/link';
import { ChevronDownIcon } from '@chakra-ui/icons';
import ResponsiveNav from '../../navigation/components/ResponsiveNav';
import { useAuth } from '../../../../hooks/useAuth';
import { useAppDispatch } from '../../../../store';
import { logout } from '../../../../store/authSlice';
import { useRouter } from 'next/navigation';

const Header = () => {
  const { user, isAuthenticated } = useAuth();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  return (
    <>
      <Flex
        width="100%"
        shadow="xl"
        p="10px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Link href="/">
          <Heading as="h1" color="#bd3a6a">
            Lebonmeeple<span style={{ fontSize: '16px' }}>.com</span>
          </Heading>
        </Link>

        {/* Section centrale avec navigation */}
        {/* <HStack spacing={4} flex={1} justify="center">
          <Show above="md">
            <Nav />
          </Show>
        </HStack> */}

        {/* Section droite avec avatar ou navigation mobile */}
        <HStack spacing={4}>
          {/* Affichage conditionnel de l'avatar */}
          {isAuthenticated && user ? (
            <Show above="md">
              <Menu>
                <MenuButton as={Button} variant="ghost" p={0}>
                  <HStack spacing={2}>
                    <Avatar size="sm" name={user.username} src={user.avatar} />
                    <Text fontSize="sm" fontWeight="medium">
                      {user.username}
                    </Text>
                    <ChevronDownIcon />
                  </HStack>
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => router.push('/profile')}>
                    Mon profil
                  </MenuItem>
                  <MenuItem onClick={() => router.push('/post/create')}>
                    Écrire un article
                  </MenuItem>
                  <MenuItem onClick={handleLogout} color="red.500">
                    Se déconnecter
                  </MenuItem>
                </MenuList>
              </Menu>
            </Show>
          ) : (
            /* Si pas connecté, afficher les liens de connexion sur desktop */
            <Show above="md">
              <HStack spacing={2}>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Connexion
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button colorScheme="brand" size="sm">
                    Inscription
                  </Button>
                </Link>
              </HStack>
            </Show>
          )}

          {/* Navigation mobile */}
          <Show below="md">
            <ResponsiveNav />
          </Show>
        </HStack>
      </Flex>
    </>
  );
};

export default Header;
