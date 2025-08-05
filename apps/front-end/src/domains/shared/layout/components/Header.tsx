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
  Button as ChakraButton,
} from '@chakra-ui/react';
import Link from 'next/link';
import { ChevronDownIcon } from '@chakra-ui/icons';
import ResponsiveNav from '@/domains/shared/navigation/components/ResponsiveNav';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { logout } from '@/domains/user/slice';
import { useRouter } from 'next/navigation';
import Button from '@/domains/shared/button/components/Button';
import Nav from '../../navigation/components/Nav';

const Header = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.user);
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
        p="20px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Link href="/">
          <Heading as="h1" color="#bd3a6a">
            Lebonmeeple<span style={{ fontSize: '16px' }}>.com</span>
          </Heading>
        </Link>
  
        <Show above="md">
          <Nav />
        </Show>

        <HStack spacing={4}>
          {isAuthenticated && user ? (
            <Show above="md">
              <Menu>
                <MenuButton as={ChakraButton} variant="ghost" p={0}>
                  <HStack spacing={2}>
                    <Avatar size="lg" name={user.username} src={user.avatar} />
                    <Text fontSize="xl" fontWeight="medium">
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
            <Show above="md">
              <HStack spacing={2}>
                <Link href="/login">
                  <Button type="button" color="primary">
                    Connexion
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button type="button" color="secondary">
                    Inscription
                  </Button>
                </Link>
              </HStack>
            </Show>
          )}
          <Show below="md">
            <ResponsiveNav />
          </Show>
        </HStack>
      </Flex>
    </>
  );
};

export default Header;
