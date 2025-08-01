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
import ResponsiveNav from '@/domains/shared/navigation/components/ResponsiveNav';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { logout } from '@/domains/user/slice';
import { useRouter } from 'next/navigation';

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
        p="10px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Link href="/">
          <Heading as="h1" color="#bd3a6a">
            Lebonmeeple<span style={{ fontSize: '16px' }}>.com</span>
          </Heading>
        </Link>

        <HStack spacing={4}>
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
          <Show below="md">
            <ResponsiveNav />
          </Show>
        </HStack>
      </Flex>
    </>
  );
};

export default Header;
